var gulp = require('gulp');

var paths = require('../options/paths');
var plumber = require('gulp-plumber');
var modernizr = require('gulp-modernizr');
var uglify = require('gulp-uglify');


gulp.task('modernizr', function() {
	
	/*
	gulp.src(paths.src.jsLib+'modernizr.dev.js')
		.pipe(plumber())
		.pipe(modernizr('modernizr.min.js'))
		.pipe(gulp.dest(paths.src.jsLib));
	*/
	
	gulp.src(paths.src.jsLib+'modernizr.dev.js')
		.pipe(plumber())
		.pipe(modernizr({
			'cache' : false, // avoid unnecessary builds
			'devFile' : paths.src.jsLib+'modernizr.dev.js', // path to the build you're using for development
			'dest' : paths.src.jsLib+'modernizr.min.js', // path to save out the built file
		/*	'options' : {
				'shiv' : false,
				'printshiv' : false,
				'load' : false,
				'mq' : false,
				'cssclasses' : true
			},
			*/
			// based on default settings on http://modernizr.com/download/
			'options' : [
				'addTest',
				'prefixed',
				'testStyles',
				'testProps',
				'testAllProps',
				'hasEvent',
				'prefixes',
				'domprefixes'
			],
			'uglify' : true, // by default, source is uglified before saving
			// define any tests you want to explicitly include
			'tests' : [
				'csstransforms3d',
				'csstransitions',
				'history'
			],
			// Useful for excluding any tests that this tool will match
			// e.g. you use .notification class for notification elements,
			// but don’t want the test for Notification API
			'excludeTests': [
				'applicationcache', 'audio', 'backgroundsize', 'borderimage', 'borderradius', 'boxshadow', 'canvas', 'canvastext', 'cssanimations', 'csscolumns', 'cssgradients', 'cssreflections', 'csstransforms', 'csstransforms3d', 'csstransitions', 'draganddrop', 'flexbox', 'flexboxlegacy', 'fontface', 'generatedcontent', 'geolocation', 'hashchange', 'history', 'hsla', 'inlinesvg', 'input', 'inputtypes', 'localstorage', 'multiplebgs', 'opacity', 'postmessage', 'rgba', 'sessionstorage', 'smil', 'svg', 'svgclippaths', 'textshadow', 'video', 'webgl', 'websockets', 'websqldatabase', 'webworkers'
			],
			// by default, this task will crawl your project for references to Modernizr tests, set to false to disable
			'crawl' : false,
			// when crawl = true, this task will crawl all *.js, *.css, *.scss files, you can override this by defining a 'files' array below
		/*	'files' : {
				'src': []
			},
		*/	
			// have custom Modernizr tests? Add paths to their location here.
			'customTests' : []
		}))
	//	.pipe(uglify());
	//	.pipe(gulp.dest(paths.src.jsLib));
	
});