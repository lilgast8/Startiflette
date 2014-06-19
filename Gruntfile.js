module.exports = function(grunt) {
	
	
	grunt.initConfig({
		
		pkg: grunt.file.readJSON('package.json'),
		
		
		/* -------- SASS -------- */
		sass: {
			dist: {
				options: {
					style: 'compressed',
				//	style: 'expanded',
					compass: true
				},
				files: {
					'www/assets/css/styles.min.css': ['www/src/css/styles.scss']
				}
			}
		},
		
		
		/* -------- COMPASS -------- */
	/*	compass: { // Task
			dist: { // Target
				options: { // Target options
					sassDir: 'www/src/css',
					cssDir: 'www/assets/css',
					environment: 'production'
				}
			},
		//	dev: { // Another target
		//		options: {
		//			sassDir: 'sass',
		//			cssDir: 'css'
		//		}
		//	}
		},
	*/	
		
		/* -------- JSHINT -------- */
		jshint: {
			options: {
			//	'-W075': true, // Duplicate key
				'-W083': true // Don't make functions within a loop
			},
			dist: [
				'www/src/js/*.js'
			]
		},
		
		
		/* -------- MODERNIZR -------- */
		modernizr: {
			dist: {
				'devFile' : 'www/src/js/lib/modernizr.dev.js',
				'outputFile' : 'www/src/js/lib/modernizr.min.js',
				'extra' : {
					'shiv' : false,
					'printshiv' : false,
					'load' : false,
					'mq' : false,
					'cssclasses' : true
				},
				'extensibility' : {
					'addtest' : true,
					'prefixed' : true,
					'teststyles' : true,
					'testprops' : true,
					'testallprops' : true,
					'hasevents' : true,
					'prefixes' : true,
					'domprefixes' : true
				},
				'uglify' : true,
				// define any tests you want to implicitly include
				'tests' : [
					'csstransforms3d',
					'csstransitions'
				],
				// by default, this task will crawl your project for references to Modernizr tests, set to false to disable.
				'parseFiles' : false,
				// when parseFiles = true, this task will crawl all *.js, *.css, *.scss files, except files that are in node_modules/
				// you can override this by defining a 'files' array below
			//	'files' : {
			//		'src': []
			//	},
				// when parseFiles = true, matchCommunityTests = true will attempt to match user-contributed tests
				'matchCommunityTests' : false,
				// have custom Modernizr tests? Add paths to their location here.
				'customTests' : []
			}
		},
		
		
		/* -------- UGLIFY -------- */
		uglify: {
			dist: {
				files: {
					'www/assets/js/scripts.min.js': [
						'www/src/js/lib/browser-detect.js',
						'www/src/js/lib/jquery-2.1.0.min.js',
						'www/src/js/lib/greensock/TweenMax.min.js',
						'www/src/js/lib/jquery.address.min.js',
						'www/src/js/scripts.js'
					]
				}
			},
			oldie: {
				files: {
					'www/assets/js/scripts-oldie.min.js': [
						'www/src/js/lib/browser-detect.js',
						'www/src/js/lib/jquery-1.11.0.min.js',
						'www/src/js/lib/greensock/TweenMax.min.js',
						'www/src/js/lib/jquery.address.min.js',
						'www/src/js/scripts.js'
					]
				}
			}
		},
		
		
		/* -------- JSONLINT -------- */
		jsonlint: {
			dist: {
				src: [
					'www/src/json/*.json',
					'www/src/json/**/*.json'
				]
			}
		},
		
		
		/* -------- MINJSON -------- */
		minjson: {
			dist: {
				files: {
					'www/assets/json/infos-pages-fr.json': 'www/src/json/infos-pages-fr.json',
					'www/assets/json/infos-pages-en.json': 'www/src/json/infos-pages-en.json'
				}
			}
		},
		
		
		/* -------- IMAGEMIN -------- */
		imagemin: {
			dist: {
				files: [{
					expand: true,
					cwd: 'www/src/img/',
					src: ['**/*.{png, jpg, gif}'],
					dest: 'www/assets/img/'
				}]
			}
		},
		
		
		/* -------- WATCH -------- */
		watch: {
			options: {
				spawn: false,
				livereload: true
			},
			css: {
				files: [
					'www/src/css/*.scss',
					'www/src/css/**/*.scss'
				],
				tasks: ['sass']
			//	tasks: ['compass']
			},
			js: {
				files: [
					'www/src/js/*.js',
					'www/src/js/**/*.js'
				],
				tasks: ['jshint']
			},
			php: {
				files: [
					'**/*.html',
					'**/*.php'
				]
			},
			json: {
				files: [
					'www/src/json/*.json',
					'www/src/json/**/*.json'
				],
				tasks: ['jsonlint']
			}
		}
		
		
	});
	
	
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-modernizr');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-jsonlint');
	grunt.loadNpmTasks('grunt-minjson');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	
	
	grunt.registerTask('default', [
		'sass',
	//	'compass',
		'jshint',
		'jsonlint'
	]);
	
	grunt.registerTask('prod', [
		'sass',
	//	'compass',
		'jshint',
		'uglify',
		'jsonlint',
		'minjson',
		'imagemin'
	]);
	
	
	
};