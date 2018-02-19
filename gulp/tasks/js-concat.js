var gulp		= require( 'gulp' );

var options		= require( '../utils/options' );
var paths		= require( '../utils/paths' );

var plumber		= require( 'gulp-plumber' );
var concat		= require( 'gulp-concat' );
var sourcemaps	= require( 'gulp-sourcemaps' );
// var fn			= require( 'gulp-fn' );
var all			= require( 'gulp-all' );
var livereload	= require( 'gulp-livereload' );



gulp.task( 'js-concat', /*[ 'delete' ],*/ function() {
	
	var jsFiles = require( '../../' + paths.env.dev + paths.configs.jsFilesFile );
	
	var jsFilesList = getJsFileList( jsFiles );
	// console.log( jsFilesList );
	// console.log( '🏆', Object.keys( jsFilesList ).length );
	
	
	/*if ( Object.keys( jsFilesList ).length == 1 ) {
		console.log( jsFilesList[0].name );
		// console.log( jsFilesList[0].src );
		// return gulp.src( jsFilesList[0].src )
		return gulp.src( paths.env.dev + paths.assets.js.app.allJsFiles )
			.pipe( plumber() )
			.pipe( sourcemaps.init() )
			// .pipe( concat( jsFilesList[0].name ) )
			.pipe( concat( 'yolo.js' ) )
			.pipe( sourcemaps.write( './maps' ) )
			.pipe( gulp.dest( paths.env.dev + paths.assets.js.dir ) )
	}*/
	
	
	// var scriptBundles = [];
	// var subtasks;
	
	/*for ( var id in jsFilesList ) {
		console.log( '🎫', id );
		
		var jsFileList = jsFilesList[ id ];
		console.log( '📚', jsFileList );
		
		// gulp.src( yolo[0] )
		// 	.pipe( plumber() )
		// 	.pipe( sourcemaps.init() )
		// 	.pipe( concat( id ) )
		// 	.pipe( sourcemaps.write( './maps' ) )
		// 	.pipe( gulp.dest( paths.env.dev + paths.assets.js.dir ) )
	}*/
	
	var i = 0;
	var allTasks = jsFilesList.map( function( bundle ) {
		i++;
		
		if ( i < jsFilesList.length )
			return gulp.src( bundle.src )
						.pipe( plumber() )
						.pipe( sourcemaps.init() )
						.pipe( concat( bundle.name ) )
						.pipe( sourcemaps.write( './maps' ) )
						.pipe( gulp.dest( paths.env.dev + paths.assets.js.dir ) );
		else if ( i == jsFilesList.length )
			return gulp.src( bundle.src )
						.pipe( plumber() )
						.pipe( sourcemaps.init() )
						.pipe( concat( bundle.name ) )
						.pipe( sourcemaps.write( './maps' ) )
						.pipe( gulp.dest( paths.env.dev + paths.assets.js.dir ) )
						.pipe( livereload() );
	} );
	
	all( allTasks );
	
	/*
	
	var yolo = [];
	
	// parse js-files file
	for ( var id in jsFiles ) {
		var jsFile = jsFiles[ id ];
		var aFiles = [];
		
		// parse files list
		for ( var j = 0; j < jsFile.files.length; j++ ) {
			var file = jsFile.files[ j ];
			aFiles.push( paths.env.dev + paths.assets.js.dir + file );
		}
		
		// console.log( '🐯', aFiles );
		// var yolo = 0;
		yolo.push( aFiles );
		/*gulp.src( aFiles )
			.pipe( plumber() )
			.pipe( sourcemaps.init() )
			.pipe( concat( jsFile.name ) )
			.pipe( sourcemaps.write( './maps' ) )
			// .pipe( gulp.dest( paths.env.dev + paths.assets.js.dir ) );
			.pipe( gulp.dest( paths.env.dev + paths.assets.js.dir ) )
			// .pipe( livereload() );
			.pipe( fn( function( file ) {
				yolo++;
				console.log( '🦄 yolo', yolo );
				if ( yolo == 6 ) {
					console.log( '⚡️ SLP ⚡️' );
					livereload();
				}
			} ) );*/
			/*.pipe( function() {
				console.log( '🦄 yolo' );
			} );*/
		
		
		/*if lastIndex
		
		gulp.src( aFiles )
			.pipe( plumber() )
			.pipe( sourcemaps.init() )
			.pipe( concat( jsFile.name ) )
			.pipe( sourcemaps.write( './maps' ) )
			.pipe( gulp.dest( paths.env.dev + paths.assets.js.dir ) )
			.pipe( livereload() );* /
		
	}
	*/
	
	
	// console.log( yolo );
	// var names = [ 'header.js', 'scripts-desktop.js', 'scripts-mobile.js' ];
	// console.log( names );
	/*gulp.src( yolo[0] )
		.pipe( plumber() )
		.pipe( sourcemaps.init() )
		.pipe( concat( names[0] ) )
		.pipe( sourcemaps.write( './maps' ) )
		.pipe( gulp.dest( paths.env.dev + paths.assets.js.dir ) )
		.src( yolo[1] )
		.pipe( plumber() )
		.pipe( sourcemaps.init() )
		.pipe( concat( names[1] ) )
		.pipe( sourcemaps.write( './maps' ) )
		.pipe( gulp.dest( paths.env.dev + paths.assets.js.dir ) )
		.src( yolo[2] )
		.pipe( plumber() )
		.pipe( sourcemaps.init() )
		.pipe( concat( names[2] ) )
		.pipe( sourcemaps.write( './maps' ) )
		.pipe( gulp.dest( paths.env.dev + paths.assets.js.dir ) );*/
	
	/*all(
		gulp.src( yolo[0] )
			.pipe( plumber() )
			.pipe( sourcemaps.init() )
			.pipe( concat( names[0] ) )
			.pipe( sourcemaps.write( './maps' ) )
			.pipe( gulp.dest( paths.env.dev + paths.assets.js.dir ) ),
		
		gulp.src( yolo[1] )
			.pipe( plumber() )
			.pipe( sourcemaps.init() )
			.pipe( concat( names[1] ) )
			.pipe( sourcemaps.write( './maps' ) )
			.pipe( gulp.dest( paths.env.dev + paths.assets.js.dir ) ),
		
		gulp.src( yolo[2] )
			.pipe( plumber() )
			.pipe( sourcemaps.init() )
			.pipe( concat( names[2] ) )
			.pipe( sourcemaps.write( './maps' ) )
			.pipe( gulp.dest( paths.env.dev + paths.assets.js.dir ) )
			.pipe( livereload() )
	);*/
	
	/*console.log( yolo );
	gulp.src( yolo )
		.pipe( plumber() )
		.pipe( sourcemaps.init() )
		.pipe( concat( jsFile.name ) )
		.pipe( sourcemaps.write( './maps' ) )
		.pipe( gulp.dest( paths.env.dev + paths.assets.js.dir ) );*/
	
} );



function getJsFileList( jsFiles ) {
	// var jsFileList = {};
	var jsFileList = [];
	
	// options.filePath = 'app/desktop/views/pages/Home.js';
	// options.filePath = 'app/mobile/views/pages/Home.js';
	// options.filePath = 'app/shared/configs/Path.js';
	// options.filePath = 'vendor/modernizr.js';
	// console.log( '🛤 ', options.filePath );
	
	// var fullUrlJsFile = {};
	var fullUrlJsFile;
	
	var i = 0;
	// parse js-files file
	for ( var id in jsFiles ) {
		var jsFile = jsFiles[ id ];
		var aFiles = [];
		var isNeedConcat = false;
		
		// console.log( jsFile.name );
		// fullUrlJsFile[ jsFile.name ] = [];
		fullUrlJsFile = [];
		// fullUrlJsFile[ jsFile.name ] = jsFile.files;
		
		// parse files list
		for ( var j = 0; j < jsFile.files.length; j++ ) {
			var file = jsFile.files[ j ];
			
			// console.log( options.filePath.indexOf( file ), ': ', file );
			if ( options.filePath.indexOf( file ) >= 0 )
				isNeedConcat = true;
			
			/*if ( !isNeedConcat ) {
				
			}*/
			// aFiles.push( paths.env.dev + paths.assets.js.dir + file );
			// fullUrlJsFile[ jsFile.name ].push( paths.env.dev + paths.assets.js.dir + file );
			fullUrlJsFile.push( paths.env.dev + paths.assets.js.dir + file );
			// console.log( paths.env.dev + paths.assets.js.dir + file );
		}
		
		if ( isNeedConcat ) {
			// console.log( fullUrlJsFile );
			// jsFileList[ jsFile.name ] = jsFile.files;
			jsFileList[ i ] = {
				// src:	jsFile.files,
				src:	fullUrlJsFile,
				name:	jsFile.name
			};
			i++;
		}
	}
	// console.log( fullUrlJsFile );
	// console.log( jsFileList );
	
	
	return jsFileList;
}