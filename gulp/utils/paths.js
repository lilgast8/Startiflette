module.exports = {
	
	emptyFiles: 'www/**/empty-folder.txt',
	
	php: {
		indexFile:	'www/index.php',
		allFiles:	'www/php/**/*.php'
	},
	
	src: {
		allFiles: 'www/src/**/*',
		
		css: {
			desktopFile:	'www/src/css/styles-desktop.scss',
			mobileFile:		'www/src/css/styles-mobile.scss'
		},
		
		img: {
			allFiles: 'www/src/img/**/*'
		},
		
		js: {
			dir:		'www/src/js/',
			allFiles:	'www/src/js/**/*.js',
			
			app: {
				allFiles:			'www/src/js/app/**/*.js',
				desktopAllFiles:	'www/src/js/app/desktop/**/*.js',
				mobileAllFiles:		'www/src/js/app/mobile/**/*.js',
				sharedAllFiles:		'www/src/js/app/shared/**/*.js'
			}
		},
		
		json: {
			allFiles: 'www/src/json/**/*.json',
			
			config: {
				allFiles:		'www/src/json/config/*.json',
				configFile:		'www/src/json/config/config.json',
				jsFilesFile:	'www/src/json/config/js-files.json'
			},
			
			routes: {
				dir:			'www/src/json/routes/',
				allFiles:		'www/src/json/routes/**/*.json',
				concatAllFiles:	'www/src/json/routes/*.json'
			}
		}
	},
	
	assets: {
		css: {
			dir:		'www/assets/css/',
			allFiles:	'www/assets/css/*.css'
		},
		
		img: {
			dir: 'www/assets/img/'
		},
		
		js: {
			dir:			'www/assets/js/',
			allFiles:		'www/assets/js/**/*.js',
			HTML5ShivFile:	'www/assets/js/libs/html5shiv.min.js'
		},
		
		json: {
			allFiles: 'www/assets/json/**/*.json',
			
			config: {
				dir:			'www/assets/json/config/',
				jsFilesFile:	'www/assets/json/config/js-files.json'
			},
			
			routes: {
				dir: 'www/assets/json/routes/'
			}
		}
	}
	
};