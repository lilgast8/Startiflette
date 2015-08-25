module.exports = {
	
	emptyFiles	: 'www/**/empty-folder-test.txt',
	
	php : {
		indexFile	: 'www/index.php',
		allFiles	: 'www/php/**/*.php'
	},
	
	src : {
		allFiles				: 'www/src/**/*',
		cssDesktopFile			: 'www/src/css/styles-desktop.scss',
		cssMobileFile			: 'www/src/css/styles-mobile.scss',
		
		imgFiles				: 'www/src/img/**/*',
		
		js						: 'www/src/js/',
		jsFiles					: 'www/src/js/**/*.js',
		jsAppFiles				: 'www/src/js/app/**/*.js',
		jsAppDesktopFiles		: 'www/src/js/app/desktop/**/*.js',
		jsAppMobileFiles		: 'www/src/js/app/mobile/**/*.js',
		jsSharedFiles			: 'www/src/js/app/shared/**/*.js',
		
		json 					: 'www/src/json/',
		jsonAllFiles			: 'www/src/json/**/*.json',
		jsonConfigFiles			: 'www/src/json/config/*.json',
		jsonConfigFile			: 'www/src/json/config/config.json',
		jsonJsFilesFile			: 'www/src/json/config/js-files.json',
		jsonRoutes				: 'www/src/json/routes/',
		jsonRoutesConcatFiles	: 'www/src/json/routes/*.json',
		jsonRoutesFiles			: 'www/src/json/routes/**/*.json'
	},
	
	assets : {
		css				: 'www/assets/css/',
		cssFiles		: 'www/assets/css/*.css',
		img				: 'www/assets/img/',
		
		js				: 'www/assets/js/',
		jsFiles			: 'www/assets/js/**/*.js',
		jsHTML5Shiv		: 'www/assets/js/libs/html5shiv.min.js',
		
		json			: 'www/assets/json/',
		jsonAllFiles	: 'www/assets/json/**/*.json',
		jsonConfig		: 'www/assets/json/config/',
		jsonConfigFiles	: 'www/assets/json/config/*.json',
		jsonJsFilesFile	: 'www/assets/json/config/js-files.json',
		jsonRoutes		: 'www/assets/json/routes/',
		jsonRoutesFiles	: 'www/assets/json/routes/*.json',
		jsonJsFilesFile	: 'www/assets/json/config/js-files.json',
	}
	
};