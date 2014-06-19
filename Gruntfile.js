module.exports = function(grunt) {
	
	
	grunt.initConfig({
		
		pkg: grunt.file.readJSON('package.json'),
		
		
		/* -------- SASS -------- */
		sass: {
			dist: {
				options: {
					style: 'compressed'
				},
				files: {
					'www/css/styles.min.css': ['www/src/css/styles.scss']
				}
			}
		},
		
		
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
				// [REQUIRED] Path to the build you're using for development.
				'devFile' : 'www/src/js/libs/modernizr.dev.js',
				
				// [REQUIRED] Path to save out the built file.
				'outputFile' : 'www/src/js/libs/modernizr.min.js',
				
				// Based on default settings on http://modernizr.com/download/
				'extra' : {
					'shiv' : false,
					'printshiv' : false,
					'load' : false,
					'mq' : false,
					'cssclasses' : true
				},
				
				// Based on default settings on http://modernizr.com/download/
				'extensibility' : {
					'addtest' : false,
					'prefixed' : false,
					'teststyles' : true,
					'testprops' : true,
					'testallprops' : true,
					'hasevents' : false,
					'prefixes' : true,
					'domprefixes' : true
				},
				
				// By default, source is uglified before saving
				'uglify' : true,
				
				// Define any tests you want to implicitly include.
				'tests' : [
				//	'csstransforms3d': true
					'csstransforms3d',
					'csstransitions'
				],
				
				// By default, this task will crawl your project for references to Modernizr tests.
				// Set to false to disable.
				'parseFiles' : false,
				
				// When parseFiles = true, this task will crawl all *.js, *.css, *.scss files, except files that are in node_modules/.
				// You can override this by defining a 'files' array below.
				// 'files' : {
				// 'src': []
				// },
				
				// When parseFiles = true, matchCommunityTests = true will attempt to
				// match user-contributed tests.
				'matchCommunityTests' : false,
				
				// Have custom Modernizr tests? Add paths to their location here.
				'customTests' : []
			}
			
		},
		
		
		/* -------- UGLIFY -------- */
		uglify: {
			dist: {
				files: {
					'www/js/scripts.min.js': [
						'www/src/js/libs/browser-detect.js',
						'www/src/js/libs/jquery-2.1.0.min.js',
						'www/src/js/libs/greensock/TweenMax.min.js',
						'www/src/js/libs/jquery.address.min.js',
						'www/src/js/scripts.js'
					]
				}
			},
			oldie: {
				files: {
					'www/js/scripts-oldie.min.js': [
						'www/src/js/libs/browser-detect.js',
						'www/src/js/libs/jquery-1.11.0.min.js',
						'www/src/js/libs/greensock/TweenMax.min.js',
						'www/src/js/libs/jquery.address.min.js',
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
					'www/json/infos-pages-fr.json': 'www/src/json/infos-pages-fr.json',
					'www/json/infos-pages-en.json': 'www/src/json/infos-pages-en.json'
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
					dest: 'www/img/'
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
				files: ['www/src/css/*.scss'],
				tasks: ['sass']
			},
			js: {
				files: ['www/src/js/*.js'],
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
		'jshint',
		'jsonlint'
	]);
	
	grunt.registerTask('prod', [
		'sass',
		'jshint',
		'uglify',
		'jsonlint',
		'minjson',
		'imagemin'
	]);
	
	
	
};