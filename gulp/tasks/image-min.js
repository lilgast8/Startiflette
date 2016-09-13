var gulp			= require( 'gulp' );

var options			= require( '../utils/options' );
var paths			= require( '../utils/paths' );

var plumber			= require( 'gulp-plumber' );
var gutil			= require( 'gulp-util' );
var imagemin		= require( 'gulp-imagemin' );
var jpegRecompress	= require( 'imagemin-jpeg-recompress' );
var pngquant		= require( 'imagemin-pngquant' );



gulp.task( 'image-min', [ 'delete' ], function() {
	
	var canCompress, params, dest;
	
	for ( var key in options.image.params ) {
		canCompress	= true;
		params		= options.image.params[ key ];
		dest		= params.dest !== null ? params.dest : paths.env.prod + paths.assets.img.dir;
		
		if ( dest.indexOf( paths.env.dev ) > -1 ) {
			canCompress = false;
			
			console.log( gutil.colors.red( 'WARNING: the following destination ' ) + gutil.colors.bgRed( ' ' + params.dest + ' ' ) + gutil.colors.red( ' is the "dev/" directory! Be sure to set it to "www/" directory.' ) );
		}
		
		
		if ( canCompress )
			gulp.src( params.src )
			.pipe( plumber() )
			.pipe( imagemin(
				[
					jpegRecompress( {
						min: params.quality.min,
						max: params.quality.max
					} ),
					pngquant( {
						quality: params.quality.min + '-' + params.quality.max,
						speed: 3 // default 3
					} )
				]
			) )
			.pipe( gulp.dest( dest ) );
		
	}
	
} );