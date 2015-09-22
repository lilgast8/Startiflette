module.exports = {
	
	env: {
		base:	'base/',
		dev:	'dev/',
		prod:	'www/'
	},
	
	emptyFiles:	'**/empty-folder.txt',
	
	htaccess:	'.htaccess',
	robots:		'robots.txt',
	
	assets: {
		allFiles: 'assets/**/*',
		
		css: {
			dir:			'assets/css/',
			minAllFiles:	'assets/css/*.css',
			
			app: {
				desktopFile:	'assets/css/app/styles-desktop.scss',
				mobileFile:		'assets/css/app/styles-mobile.scss',
				
				desktop: {
					pages:		'assets/css/app/desktop/pages/'
				}
			},
			
			fonts: {
				dir:		'assets/css/fonts/',
				allFiles:	'assets/css/fonts/**/*'
			}
		},
		
		img: {
			dir:		'assets/img/',
			allFiles:	'assets/img/**/*'
		},
		
		js: {
			dir:		'assets/js/',
			allFiles:	'assets/js/**/*.js',
			
			app: {
				allFiles:			'assets/js/app/**/*.js',
				desktopAllFiles:	'assets/js/app/desktop/**/*.js',
				mobileAllFiles:		'assets/js/app/mobile/**/*.js',
				sharedAllFiles:		'assets/js/app/shared/**/*.js',
				
				desktop: {
					views: {
						pages: 'assets/js/app/desktop/views/pages/',
					}
				}
			},
			
			vendors: {
				dir:			'assets/js/vendors/',
				HTML5ShivFile:	'assets/js/vendors/html5shiv.min.js'
			}
		},
		
		json: {
			dir:		'assets/json/',
			allFiles:	'assets/json/**/*.json'
		}
	},
	
	configs: {
		dir:		'configs/',
		allFiles:	'configs/**/*.json',
		
		config: {
				dir:			'configs/config/',
				allFiles:		'configs/config/*.json',
				configFile:		'configs/config/config.json',
				jsFilesFile:	'configs/config/js-files.json'
		},
		
		routes: {
			dir:		'configs/config/routes/',
			allFiles:	'configs/config/routes/*.json'
		}
	},
	
	server: {
		indexFile:	'index.php',
		dir:		'server/',
		allFiles:	'server/**/*',
		
		contents: 'server/contents/',
		
		views: {
			desktop: {
				pages: 'server/views/desktop/pages/'
			}
		}
	}
	
};