var gulp	= require( 'gulp' );

var paths	= require( '../utils/paths' );

var plumber	= require( 'gulp-plumber' );
var babel	= require( 'gulp-babel' );
var uglify	= require( 'gulp-uglify' );
var rename	= require( 'gulp-rename' );



gulp.task( 'js-min', [ 'js-concat' ], function() {
	
	gulp.src( paths.env.dev + paths.assets.js.allRootJsFiles )
		.pipe( plumber() )
		.pipe( uglify() )
		.pipe( rename( { suffix : '.min' } ) )
		.pipe( gulp.dest( paths.env.prod + paths.assets.js.dir ) );
	
	gulp.src( paths.env.dev + paths.assets.js.allRootJsFiles )
		.pipe( plumber() )
		.pipe( babel( {
			presets: [ 'env' ]
        } ) )
		.pipe( uglify() )
		.pipe( rename( { suffix : '-es5.min' } ) )
		.pipe( gulp.dest( paths.env.prod + paths.assets.js.dir ) );
	
} );