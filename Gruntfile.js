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
				'-W075': true
			},
			dist: [
				'www/src/js/*.js'
			]
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
				src: ['www/json/*.json']
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
				files: ['www/src/json/*.json'],
				tasks: ['jsonlint']
			}
		}
		
		
	});
	
	
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-jshint');
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