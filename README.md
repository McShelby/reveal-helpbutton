# HelpButton

A [reveal.js](https://github.com/hakimel/reveal.js/) plugin to open the help screen by pressing a button.

<img style="border: 1px solid gray;" src="screenshot-button.png" width="55%">

This is handy if you upload your presentation and someone with no knowledge of reveal.js' keyboard shortcuts wants to view it. The plugin can be configured when to show the button.

Works with all official themes. No further dependencies. No bloated installation.

## Installation

Copy this repository into the plugins folder of your reveal.js presentation, ie ```plugin/helpbutton```.

Add the plugin to the dependencies in your presentation, as below.

```javascript
Reveal.initialize({
	// ...
	dependencies: [
		// ...
		{ src: 'plugin/helpbutton/helpbutton.js', async: true },
	]
});
```

## Usage

You can configure the button for your presentation by providing the ```helpButtonDisplay``` option in the reveal.js initialization options. The config value is optional and will default as specified below.

```javascript
Reveal.initialize({
	// Displays a help button in the lower left corner.
	// When pressed it shows the built-in reveal.js help screen.
	// Possible values:
	//   'none'      button will never been shown
	//   'first'     shows button on the very first slide
	//   'intro'     shows button on all slides of the first column of slides
	//   'always'    always shows the button on every slide
	helpButtonDisplay: 'first',
});
```

## API

### Javascript

The plugin API is accessible from the global ```HelpButton``` object.

```javascript
// Change a config value at runtime
HelpButton.configure({
	helpButtonDisplay: 'none',
});
```

## License

[MIT licensed](https://en.wikipedia.org/wiki/MIT_License).

Copyright (C) 2018 [Sören Weber](https://soeren-weber.de)
