var gulp		= require( 'gulp' );

var paths		= require( '../utils/paths' );

var plumber		= require( 'gulp-plumber' );
var imagemin	= require( 'gulp-imagemin' );

var jpegtran	= require( 'imagemin-jpegtran' );
// var optipng		= require( 'imagemin-optipng' );
// var pngquant	= require( 'imagemin-pngquant' );
// var pngcrush	= require( 'imagemin-pngcrush' );
// var pngout		= require( 'imagemin-pngout' );
var advpng		= require( 'imagemin-advpng' );



gulp.task( 'image-min', [ 'delete' ], function() {
	
	gulp.src( [
			paths.env.dev + paths.assets.img.allFiles,
			'!' + paths.env.dev + paths.emptyFiles
		] )
		.pipe( plumber() )
		.pipe( imagemin({
			// progressive:	false // jpg, default false
			// optimizationLevel:	3, // png, default 3
			
			// progressive:	true, // jpg, default false
			// optimizationLevel:	3, // png, default 3
			use:			[
								jpegtran({progressive: true}),
								
								
								
								// optipng({optimizationLevel: 7})
								
								/*pngquant({
									// quality: '70-90',
									// speed: 3 // default 3
								})*/
								
								// pngcrush({reduce: true})
								
								// pngout()
								
								advpng()
							]
		}) )
		.pipe( gulp.dest( paths.env.prod + paths.assets.img.dir ) );
	
} );