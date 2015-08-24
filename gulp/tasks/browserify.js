var gulp		= require( 'gulp' );

// var options	= require( '../utils/options' )
// var paths	= require( '../utils/paths' );

var plumber		= require( 'gulp-plumber' );
var browserify	= require( 'browserify' );
var watchify	= require( 'watchify' );
var source		= require( 'vinyl-source-stream' );
var gutil		= require( 'gulp-util' );



gulp.task( 'browserify', function() {
	
	/*var b = browserify({ 
		// cache: {},
		// packageCache: {},
		// fullPaths: true,
		// // extensions: ['.html'], 
		// // paths: [ "app/scripts/project/", "app/scripts/project/app/", "node_modules", "tpl"],
		// paths: [ 'www/src/js/' ],
		entries : [ 'www/src/js/Main.js' ],
		debug: true
	});*/
	
	
	
	
	/*var b = browserify({
		cache: {},
		packageCache: {},
		fullPaths: true
		// paths: [ 'www/src/js/' ]
	});*/
	
	var b = browserify({ 
		cache: {},
		packageCache: {},
		fullPaths: true,
		// // extensions: ['.html'], 
		// // paths: [ "app/scripts/project/", "app/scripts/project/app/", "node_modules", "tpl"],
		paths: [ 'www/src/js/' ],
		// entries : [ 'www/src/js/Main.js' ],
		debug: true
	});
	
	b = watchify(b);
	b.on('update', function(){
		bundleShare(b);
	});
	b.on('log', gutil.log); // output build logs to terminal
	
	b.add( 'www/src/js/Main.js' );
	bundleShare(b);
	
	// b.add(config.browserify.entry)
	// return bundleBrowserify(b);
	
	
	
	// return gulp.src( options.cleanPath, {read : false} )
	// 	.pipe( plumber() )
	// 	.pipe( clean() );
	
});


function bundleShare(b) {
	b.bundle()
		.pipe( plumber() )
		.pipe( source( 'scripts.js' ) )
		.pipe( gulp.dest( 'www/src/js/' ) );
}