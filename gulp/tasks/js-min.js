var gulp	= require( 'gulp' );

var options	= require( '../utils/options' );
var paths	= require( '../utils/paths' );

var plumber	= require( 'gulp-plumber' );
var babel	= require( 'gulp-babel' );
// var uglify	= require( 'gulp-uglify' );
var uglify	= require( 'gulp-uglify-es' ).default;
var rename	= require( 'gulp-rename' );



gulp.task( 'js-min', [ 'js-concat', 'set-uid' ], function() {
	
	// es6
	gulp.src( paths.env.dev + paths.assets.js.allRootJsFiles )
		.pipe( plumber() )
		.pipe( uglify() )
		.pipe( rename( { suffix : '-' + options.U_ID.js + '.min' } ) )
		.pipe( gulp.dest( paths.env.prod + paths.assets.js.dir ) );
	
	// es5
	gulp.src( paths.env.dev + paths.assets.js.allRootJsFiles )
		.pipe( plumber() )
		.pipe( babel( {
			presets: [ 'env' ]
        } ) )
		.pipe( uglify() )
		.pipe( rename( { suffix : '-es5-' + options.U_ID.js + '.min' } ) )
		.pipe( gulp.dest( paths.env.prod + paths.assets.js.dir ) );
	
} );