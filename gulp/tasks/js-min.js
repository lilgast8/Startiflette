var gulp	= require( 'gulp' );

var options	= require( '../utils/options' );
var paths	= require( '../utils/paths' );

var plumber	= require( 'gulp-plumber' );
var babel	= require( 'gulp-babel' );
// var uglify	= require( 'gulp-uglify' );
var uglify	= require( 'gulp-uglify-es' ).default;
var rename	= require( 'gulp-rename' );



gulp.task( 'js-min', [ 'js-concat', 'set-uid' ], function() {
	
	gulp.src( paths.env.dev + paths.assets.js.allRootJsFiles )
		.pipe( plumber() )
		.pipe( uglify() )
		// .pipe( rename( { suffix : '.min' } ) )
		.pipe( rename( { suffix : '-' + options.U_ID.js + '.min' } ) )
		.pipe( gulp.dest( paths.env.prod + paths.assets.js.dir ) );
	
	gulp.src( paths.env.dev + paths.assets.js.allRootJsFiles )
		.pipe( plumber() )
		.pipe( babel( {
			presets: [ 'env' ]
        } ) )
		.pipe( uglify() )
		// .pipe( rename( { suffix : '-es5.min' } ) )
		.pipe( rename( { suffix : '-es5-' + options.U_ID.js + '.min' } ) )
		.pipe( gulp.dest( paths.env.prod + paths.assets.js.dir ) );
	
} );



/*

var gulp	= require( 'gulp' );

var paths	= require( '../utils/paths' );

var plumber	= require( 'gulp-plumber' );
var getUid	= require( 'get-uid' );
var babel	= require( 'gulp-babel' );
var uglify	= require( 'gulp-uglify' );
var rename	= require( 'gulp-rename' );

var fs		= require( 'fs' );



gulp.task( 'js-min', [ 'js-concat' ], function() {
	
	var uID = setUid();
	console.log( '🦁', uID );
	
	
	gulp.src( paths.env.dev + paths.assets.js.allRootJsFiles )
		.pipe( plumber() )
		.pipe( uglify() )
		// .pipe( rename( { suffix : '.min' } ) )
		.pipe( rename( { suffix : '-' + uID + '.min' } ) )
		.pipe( gulp.dest( paths.env.prod + paths.assets.js.dir ) );
	
	gulp.src( paths.env.dev + paths.assets.js.allRootJsFiles )
		.pipe( plumber() )
		.pipe( babel( {
			presets: [ 'env' ]
		} ) )
		.pipe( uglify() )
		// .pipe( rename( { suffix : '-es5.min' } ) )
		.pipe( rename( { suffix : '-es5-' + uID + '.min' } ) )
		.pipe( gulp.dest( paths.env.prod + paths.assets.js.dir ) );
	
} );


function setUid() {
	// var config = require( '../../' + paths.env.dev + paths.configs.configFile );
	var config = require( '../../' + paths.env.prod + paths.configs.configFile );
	
	// var configProd	= JSON.parse( JSON.stringify( config ) );
	// var jsUid		= JSON.parse( JSON.stringify( config.U_ID.js ) );
	
	var uID = getUid();
	
	config.U_ID.js = uID;
	
	// console.log( config.U_ID.js );
	// console.log( config );
	// console.log( jsUid );
	
	// console.log( '⚡️ SLP ⚡️' );
	
	
	
	var data		= JSON.stringify( config );
	// console.log( data );
	
	fs.writeFileSync( paths.env.prod + paths.configs.configFile, data, 'utf8' );
	
	
	return uID;
}

*/