var gulp		= require( 'gulp' );

var paths		= require( '../utils/paths' );

var plumber		= require( 'gulp-plumber' );
var imagemin	= require( 'gulp-imagemin' );

var jpegRecompress	= require( 'imagemin-jpeg-recompress' );
var pngquant	= require( 'imagemin-pngquant' );



gulp.task( 'image-min', [ 'delete' ], function() {
	
	gulp.src( [
			paths.env.dev + paths.assets.img.allFiles,
			'!' + paths.env.dev + paths.emptyFiles
		] )
		.pipe( plumber() )
		.pipe( imagemin({
			use:	[
						jpegRecompress({
							min: 60,
							max: 60
						}),
						
						pngquant(/*{
							quality: '70-90',
							speed: 3 // default 3
						}*/)
					]
		}) )
		.pipe( gulp.dest( paths.env.prod + paths.assets.img.dir ) );
	
} );