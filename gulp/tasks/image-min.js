var gulp		= require( 'gulp' );

var paths		= require( '../utils/paths' );

var plumber		= require( 'gulp-plumber' );
var imagemin	= require( 'gulp-imagemin' );

var jpegtran	= require( 'imagemin-jpegtran' );
// var pngquant	= require( 'imagemin-pngquant' );
var zopfli		= require( 'imagemin-zopfli' );



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
								jpegtran({ progressive: true }),
								
								
								/*pngquant({
									// quality: '70-90',
									// speed: 3 // default 3
								})*/
								
								zopfli()
							]
		}) )
		.pipe( gulp.dest( paths.env.prod + paths.assets.img.dir ) );
	
} );