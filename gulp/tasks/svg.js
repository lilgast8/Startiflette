var gulp		= require( 'gulp' );

var options		= require( '../utils/options' );
var paths		= require( '../utils/paths' );

var plumber		= require( 'gulp-plumber' );
var gutil		= require( 'gulp-util' );
var svgSprite	= require( 'gulp-svg-sprite' );



gulp.task( 'svg', [ 'svg:dev' ], function() {
	
	if ( options.task == 'svg' )
		gulp.start( 'move' );
	
});


gulp.task( 'svg:dev', [ 'delete' ], function() {
	
	if ( options.svgSrcPath === null )
		options.svgSrcPath = paths.env.dev + paths.assets.svg.allFiles;
	
	
	var config = {
		dimension: {
			maxWidth:	1024,
			maxHeight:	1024
		},
		svg: {
			xmlDeclaration:		false,
			doctypeDeclaration:	false
		},
		mode: {
			symbol: {
				dest:		'',
				dimensions:	true,
				sprite:		'sprite.svg',
				bust:		false
			}
		}
	};
	
	return gulp.src( options.svgSrcPath )
		.pipe( plumber() )
		.pipe( svgSprite( config ) )
		.on( 'error', function( error ) {
			console.log( gutil.colors.red( error ) );
		})
		.pipe( gulp.dest( paths.env.dev + paths.assets.svg.sprite.dir ) );
	
});