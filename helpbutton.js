var HelpButton = ( function( Reveal ){

	var defMode = 'first';

	function addStylesheet( href ){
		var link = document.createElement( 'link' );
		link.rel = 'stylesheet';
		link.href = href;
		document.querySelector( 'head' ).appendChild( link );
	}

	function installStylesheets(){
		// Plugins may be stored outside of the reveal installation
		// therefore we have to find out the proper path first
		var config = Reveal.getConfig();
		var regex = /\/helpbutton.js$/i;
		var help_config = config.dependencies.find( function( e ){
			return e.src && e.src.search( regex ) >= 0;
		});
		if( !help_config ){
			console.error( 'helpbutton.js not found in config dependencies. Did you rename this file?' );
			return;
		}
		var path = help_config.src.replace( regex, '' );
		addStylesheet( path + '/helpbutton.css' );
}

	function setHelpButtonConfig( helpButtonDisplay ){
		var values = [ 'none', 'first', 'intro', 'always' ];
		var config = Reveal.getConfig();
		Reveal.configure({ helpButtonDisplay: config.helpButtonDisplay || defMode });
		if( values.indexOf( helpButtonDisplay ) < 0 ){
			console.error( 'Invalid value for configuration helpButtonDisplay. Allowed values are: ' + values.join( ', ') + '.' );
			return;
		}
		Reveal.configure({ helpButtonDisplay: helpButtonDisplay });
	}

	function setHelpButtonContainer( event ){
		// install help button in lower left position but initially
		// hide it until all styles are set
		var control = document.createElement( 'aside' );
		control.classList.add( 'controls', 'helpbutton-container' );
		control.innerHTML = '<button class="helpbutton" disabled="disabled" style="display: none;" onclick="Reveal.toggleHelp()"><div></div></button>';
		document.querySelector( '.reveal' ).appendChild( control );
	}

	function setHelpButton( event ){
		// event.previousSlide, event.currentSlide, event.indexh, event.indexv
		var help = document.querySelector( '.helpbutton' );
		if( help ){
			var config = Reveal.getConfig();
			var display = 'none';
			if( config.helpButtonDisplay == 'always'
				|| ( config.helpButtonDisplay == 'intro' && !event.indexh )
				|| ( config.helpButtonDisplay == 'first' && !event.indexh && !event.indexv ) ){
				display = 'block';
			}
			if( help.style.display != display ){
				help.style.display = display;
			}
			if( display == 'none' ){
				help.classList.remove( 'enabled' );
				help.setAttribute( 'disabled', 'disabled' );
			}else{
				help.classList.add( 'enabled' );
				help.removeAttribute( 'disabled' );
			}
		}
	}

	function toggleHelpButton( event ){
		setHelpButton({
			previousSlide: Reveal.getPreviousSlide(),
			currentSlide: Reveal.getCurrentSlide(),
			indexh: Reveal.getIndices().h,
			indexv: Reveal.getIndices().v
		});
	}

	function installHelpButton(){
		setHelpButtonContainer();

		// the slidechange event will not be triggered on
		// initial page load, so we need to toggle the
		// button manually here once
		Reveal.addEventListener( 'slidechanged', setHelpButton );
		toggleHelpButton();
	}

	function configure( o ){
		if( o && o.helpButtonDisplay !== undefined ){
			setHelpButtonConfig( o.helpButtonDisplay );
			toggleHelpButton();
		}
	}

	function install(){
		installStylesheets();
		setHelpButtonConfig( defMode );
		// in case we are loading async the ready event may already
		// been emitted, so test here for readiness here and install
		// manually here
		if( Reveal.isReady() ){
			installHelpButton();
		}else{
			Reveal.addEventListener( 'ready', function(){
				installHelpButton();
			});
		}
	}

	install();

	return {
		configure: configure
	};

})( Reveal );
