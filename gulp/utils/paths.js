module.exports = {
	
	emptyFiles : 'www/**/empty-folder.txt',
	
	php : {
		indexFile	: 'www/index.php',
		allFiles	: 'www/php/**/*.php'
	},
	
	src : {
		allFiles			: 'www/src/**/*',
		cssDesktopFile		: 'www/src/css/styles-desktop.scss',
		cssMobileFile		: 'www/src/css/styles-mobile.scss',
		
		imgFiles			: 'www/src/img/**/*',
		
		jsJsFilesFile		: 'www/src/js/js-files.json',
		js					: 'www/src/js/',
		jsFiles				: 'www/src/js/**/*.js',
		jsAppFiles			: 'www/src/js/app/**/*.js',
		jsAppDesktopFiles	: 'www/src/js/app/desktop/**/*.js',
		jsAppMobileFiles	: 'www/src/js/app/mobile/**/*.js',
		jsSharedFiles		: 'www/src/js/app/shared/**/*.js',
		
		json 				: 'www/src/json/',
		jsonAllFiles		: 'www/src/json/**/*.json',
		jsonConcatFiles		: 'www/src/json/*.json'
	},
	
	assets : {
		css			: 'www/assets/css/',
		cssFiles	: 'www/assets/css/**/*.css',
		img			: 'www/assets/img/',
		
		js			: 'www/assets/js/',
		jsFiles		: 'www/assets/js/**/*.js',
		jsHTML5Shiv	: 'www/assets/js/libs/html5shiv.min.js',
		
		json		: 'www/assets/json/'
	}
	
};