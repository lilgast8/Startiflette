module.exports = {
	
	php : {
		root					: 'www/php/',
		
		contents				: 'www/contents/',
		functions				: 'www/functions/',
		libs					: 'www/libs/',
		shared					: 'www/shared/',
		
		views					: 'www/includes/views/',
		viewsAlt				: 'www/includes/alt/',
		viewsDesktopPages		: 'www/includes/desktop/pages/',
		viewsDesktopPartials	: 'www/includes/desktop/partials/',
		viewsMobilePages		: 'www/includes/mobile/pages/',
		viewsMobilePartials		: 'www/includes/mobile/partials/'
	},
	
	src : {
		allFiles			: 'www/src/**/*',
		cssDesktopFile		: 'www/src/css/styles-desktop.scss',
		cssMobileFile		: 'www/src/css/styles-mobile.scss',
		
		img					: 'www/src/img/',
		imgLogosBrowsers	: 'www/src/img/logos/browsers/',
		
		jsJsFilesFile		: 'www/src/js/js-files.json',
		js					: 'www/src/js/',
		jsAppFiles			: 'www/src/js/app/**/*.js',
		jsAppDesktopFiles	: 'www/src/js/app/desktop/**/*.js',
		jsAppMobileFiles	: 'www/src/js/app/mobile/**/*.js',
		jsSharedFiles		: 'www/src/js/app/shared/**/*.js',
		jsLib				: 'www/src/js/libs/',
		
		jsonAllFiles		: 'www/src/json/**/*.json'
	},
	
	assets : {
		img			: 'www/assets/img/',
		
		js			: 'www/assets/js/',
		jsAllFiles	: 'www/assets/js/**/*.js',
		jsLib		: 'www/assets/js/libs/',
		jsHTML5Shiv	: 'www/assets/js/libs/html5shiv.min.js',
		
		json		: 'www/assets/json/'
	}
	
};