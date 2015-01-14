var gulp		= require( 'gulp' );
var path		= require( 'path' );

var options		= require( '../utils/options' );
var paths		= require( '../utils/paths' );

var plumber		= require( 'gulp-plumber' );
// var notify		= require( 'gulp-notify' );
// var jsonlint	= require( 'gulp-jsonlint' );
// var jsoncombine	= require( 'gulp-jsoncombine' );
// var concatjson	= require( 'gulp-concat-json' );

// var jsoncombine = require( 'gulp-jsoncombine' );
// var concat = require( 'gulp-concat' );
var concatjson = require( 'gulp-concat-json' );



var fs = require('fs');

gulp.task( 'json-test', function() {
	
	/*
	gulp.src( 'www/src/json/** /pages.json' )
		.pipe( plumber() )
		.pipe( jsoncombine( "result.js", function(data){
			// console.log('DATA :', data);
			
			fs.writeFile('www/src/json/pages.json', data, function (err) {
				console.log('DATA :', data);
				if (err) throw err;
				console.log('It\'s saved!');
			});
			
			
		}) )
		.pipe( gulp.dest( paths.assets.json ) );
	*/
	
	
	/*
	gulp.src( 'www/src/json/** /pages.json' )
		.pipe( plumber() )
		.pipe( concat( 'page_test.json' ) )
		.pipe( gulp.dest( 'www/src/json/' ) );
	*/
	
	
	/*
	gulp.src( 'www/src/json/** /pages.json' )
		.pipe( plumber() )
		.pipe( concatjson( 'page_test.json' ) )
		.pipe( gulp.dest( 'www/src/json/' ) );
	*/
	
	// var listFiles = getListFiles();
	// console.log(listFiles);
	
	var firstDir	= false;
	
	var listFiles	= null;
	var files		= fs.readdirSync( 'www/src/json/' );
	var dirs		= [];
	
	console.log(files.length);
	console.log(files);
	
	var file, filePath, fileInfo;
	
	for ( i = 0; i < files.length; i++ ) {
		file = files[i];
		
		if ( file[0] !== '.' ) {
			console.log('FILE :', file);
			filePath = 'www/src/json/' + file;
			fileInfo = fs.statSync( filePath );
			
			if ( fileInfo.isDirectory() ) {
				dirs.push(file);
				
				if ( !firstDir ) {
					listFiles = getListFiles( file );
					firstDir = true;
				}
			}
		}
	}
	console.log('DIRS :', dirs);
	console.log('LIST FILES :', listFiles);
	
	
	console.log('www/src/json/' + dirs[0] + '/' + listFiles[0]);
	var data = fs.readFileSync( 'www/src/json/' + dirs[0] + '/' + listFiles[0], 'utf8' );
	console.log(data);
	
	
	// fs.writeFile( 'www/src/json/pages.json', data, function (err) {
	fs.writeFileSync( 'www/src/json/pages_yo.json', data, 'utf8' );
	
	
});




function getListFiles(dir) {
	console.log('Get List Files :', dir);
	
	var files = fs.readdirSync( 'www/src/json/' + dir );
	var listFiles = [];
	var file;
	
	for ( i = 0; i<files.length; i++ ) {
		file = files[i];
		console.log('YOYOYOYO', file);
		
		if ( file[0] !== '.' )
			listFiles.push( file );
	}
	
	return listFiles;
}