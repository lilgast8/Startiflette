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
		
		favicons:	{
			dir: 		'assets/favicons/',
			allFiles:	'assets/favicons/**/*'
		},
		
		files: {
			dir:		'assets/files/',
			allFiles:	'assets/files/**/*'
		},
		
		img: {
			dir:		'assets/img/',
			allFiles:	'assets/img/**/*'
		},
		
		js: {
			dir:		'assets/js/',
			allFiles:	'assets/js/**/*.js',
			
			app: {
				dir:				'assets/js/app/',
				allFiles:			'assets/js/app/**/*.js',
				initFile:			'assets/js/app/InitApp.js',
				desktopAllFiles:	'assets/js/app/desktop/**/*.js',
				mobileAllFiles:		'assets/js/app/mobile/**/*.js',
				sharedAllFiles:		'assets/js/app/shared/**/*.js',
				
				desktop: {
					views: {
						pages: 'assets/js/app/desktop/views/pages/',
					}
				}
			},
			
			vendor: {
				dir:			'assets/js/vendor/',
				HTML5ShivFile:	'assets/js/vendor/html5shiv.min.js'
			}
		},
		
		json: {
			dir:		'assets/json/',
			allFiles:	'assets/json/**/*.json'
		},
		
		sounds: {
			dir:		'assets/sounds/',
			allFiles:	'assets/sounds/**/*'
		},
		
		svg: {
			dir:		'assets/svg/',
			allFiles:	'assets/svg/*.svg',
			
			sprite: {
				dir:		'assets/svg/_sprite/',
				allFiles:	'assets/svg/_sprite/*.svg',
				spriteFile:	'assets/svg/_sprite/sprite.svg'
			}
		},
		
		videos: {
			dir:		'assets/videos/',
			allFiles:	'assets/videos/**/*'
		}
	},
	
	configs: {
		dir:			'configs/',
		allFiles:		'configs/**/*',
		allJsonFiles:	'configs/**/*.json',
		
		config: {
				dir:			'configs/config/',
				allFiles:		'configs/config/*.json',
				configFile:		'configs/config/config.json',
				jsFilesFile:	'configs/config/js-files.json'
		},
		
		favicons: {
			dir:		'configs/favicons/',
			allFiles:	'configs/favicons/*.json',
			configFile:	'configs/favicons/config.json',
			dataFile:	'configs/favicons/faviconData.json',
			srcFile:	'configs/favicons/favicons.php'
		},
		
		routes: {
			dir:		'configs/routes/',
			allFiles:	'configs/routes/*.json'
		}
	},
	
	server: {
		indexFile:	'index.php',
		dir:		'server/',
		allFiles:	'server/**/*',
		
		contents: 'server/contents/',
		
		shared: {
			dir: 'server/shared/'
		},
		
		views: {
			desktop: {
				pages: 'server/views/desktop/pages/'
			}
		}
	}
	
};