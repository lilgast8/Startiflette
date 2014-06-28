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
			},
			prod: {
				options: {
					style: 'compressed',
					compass: true
				},
				files: {
					'www/assets/css/styles.min.css': ['www/src/css/styles.scss']
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
				'www/src/js/app/**/*.js'
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
					'csstransitions',
					'history'
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
						'www/src/js/lib/zepto-1.1.3.min.js',
						'www/src/js/lib/greensock/TweenMax.min.js',
						'www/src/js/lib/history-1.8b2.min.js',
						'www/src/js/lib/preloadjs-0.4.1.min.js',
						'www/src/js/lib/signals-1.0.0.min.js',
						'www/src/js/lib/zepto.dcspamless.1.0.min.js',
						'www/src/js/app/InitApp.js',
						'www/src/js/app/com/**/*.js',
						'www/src/js/app/Main.js'
					],
					'www/assets/js/lib/modern-detect-izr.min.js': [
						'www/src/js/lib/modernizr.min.js',
						'www/src/js/lib/detectizr-2.0.0.min.js'
					]
				}
			},
			oldie: {
				files: {
					'www/assets/js/scripts-oldie.min.js': [
						'www/src/js/lib/jquery-1.11.0.min.js',
						'www/src/js/lib/greensock/TweenMax.min.js',
						'www/src/js/lib/history-1.8b2.min.js',
						'www/src/js/lib/preloadjs-0.4.1.min.js',
						'www/src/js/lib/signals-1.0.0.min.js',
						'www/src/js/lib/zepto.dcspamless.1.0.min.js',
						'www/src/js/app/InitApp.js',
						'www/src/js/app/com/**/*.js',
						'www/src/js/app/Main.js'
					]
				}
			}
		},
		
		
		/* -------- JSONLINT -------- */
		jsonlint: {
			dist: {
				src: [
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
			//	spawn: false,
				livereload: true
			},
			css: {
				files: [
					'www/src/css/**/*.scss'
				],
				tasks: ['sass']
			},
			js: {
				files: [
					'www/src/js/app/**/*.js'
				],
				tasks: ['jshint']
			},
			json: {
				files: [
					'www/src/json/**/*.json'
				],
				tasks: ['jsonlint']
			},
			php: {
				files: [
					'www/**/*.html',
					'www/**/*.php'
				]
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
		'sass:dist',
		'jshint',
		'jsonlint'
	]);
	
	grunt.registerTask('prod', [
		'sass:prod',
		'jshint',
		'uglify',
		'jsonlint',
		'minjson',
		'imagemin'
	]);
	
	
	
};