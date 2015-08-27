module.exports = {
	
	env: {
		dev:	'dev/',
		prod:	'dist/'
	},
	
	emptyFiles: '**/empty-folder.txt',
	
	php: {
		indexFile:	'index.php',
		dir:		'php/',
		allFiles:	'php/**/*.php'
	},
	
	assets: {
		allFiles: 'assets/**/*',
		
		css: {
			dir:			'assets/css/',
			minAllFiles:	'assets/css/*.css',
			
			app: {
				desktopFile:	'assets/css/app/styles-desktop.scss',
				mobileFile:		'assets/css/app/styles-mobile.scss'
			}
		},
		
		img: {
			dir:		'assets/img/',
			allFiles:	'assets/img/**/*'
		},
		
		js: {
			dir:			'assets/js/',
			allFiles:		'assets/js/**/*.js',
			HTML5ShivFile:	'assets/js/libs/html5shiv.min.js',
			
			app: {
				allFiles:			'assets/js/app/**/*.js',
				desktopAllFiles:	'assets/js/app/desktop/**/*.js',
				mobileAllFiles:		'assets/js/app/mobile/**/*.js',
				sharedAllFiles:		'assets/js/app/shared/**/*.js'
			}
		},
		
		json: {
			dir:		'assets/json/',
			allFiles:	'assets/json/**/*.json',
			
			config: {
				dir:			'assets/json/config/',
				allFiles:		'assets/json/config/*.json',
				configFile:		'assets/json/config/config.json',
				jsFilesFile:	'assets/json/config/js-files.json'
			},
			
			routes: {
				dir:			'assets/json/routes/',
				allFiles:		'assets/json/routes/**/*.json',
				concatAllFiles:	'assets/json/routes/*.json'
			}
		}
	}
	
};