var gulp	= require('gulp');

var options	= require( '../utils/options' );
var paths	= require('../utils/paths');

var plumber	= require('gulp-plumber');



gulp.task( 'move', function() {
	
	/* Prod */
	if ( options.movePath === null && options.task == 'prod' )
		options.movePath = {
			from: [
				paths.env.dev + paths.assets.css.minAllFiles,
				paths.env.dev + paths.assets.css.fonts.allFiles,
				paths.env.dev + paths.assets.js.vendors.HTML5ShivFile,
				paths.env.dev + paths.php.allFiles,
			],
			to: [
				paths.env.prod + paths.assets.css.dir,
				paths.env.prod + paths.assets.css.fonts.dir,
				paths.env.prod + paths.assets.js.vendors.dir,
				paths.env.prod + paths.php.dir
			]
		};
	
	
	/* SASS */
	else if ( options.movePath === null && options.task == 'sass' )
		options.movePath = {
			from: [
				paths.env.dev + paths.assets.css.minAllFiles,
				paths.env.dev + paths.assets.css.fonts.allFiles
			],
			to: [
				paths.env.prod + paths.assets.css.dir,
				paths.env.prod + paths.assets.css.fonts.dir
			]
		};
	
	
	/* JS & JS-min */
	else if ( options.movePath === null && ( options.task == 'js' || options.task == 'js-min' ) )
		options.movePath = {
			from: [ paths.env.dev + paths.assets.js.vendors.HTML5ShivFile ],
			to: [ paths.env.prod + paths.assets.js.vendors.dir ]
		};
	
	
	/* Image */
	else if ( options.movePath === null && ( options.task == 'image' || options.task == 'image-min' || options.task == 'image-move' ) )
		options.movePath = {
			from: [ paths.env.dev + paths.assets.img.allFiles ],
			to: [ paths.env.prod + paths.assets.img.dir ]
		};
	
	
	/* PHP */
	else if ( options.movePath === null && options.task == 'php' )
		options.movePath = {
			from: [ paths.env.dev + paths.php.allFiles ],
			to: [ paths.env.prod + paths.php.dir ]
		};
	
	
	
	if ( options.movePath !== null ) {
		for ( var i = 0; i < options.movePath.from.length; i++ ) {
			
			gulp.src( options.movePath.from[i] )
				.pipe( plumber() )
				.pipe( gulp.dest( options.movePath.to[i] ) );
			
		}
	}
	
} );