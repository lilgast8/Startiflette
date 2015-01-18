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
// var concatjson = require( 'gulp-concat-json' );
// var jsonformat = require( 'gulp-json-format' );

var fs = require( 'fs' );



function getInfosFiles( files ) {
	var infosFiles	= [];
	var langDirs	= [];
	var jsonFiles	= [];
	
	var firstDir	= false;
	var file, filePath, fileInfo;
	
	for ( var i = 0; i < files.length; i++ ) {
		file = files[i];
		// console.log('FILE :', file);
		
		if ( file[0] !== '.' ) {
			filePath = 'www/src/json/' + file;
			fileInfo = fs.statSync( filePath );
			
			if ( fileInfo.isDirectory() ) {
				langDirs.push(file);
				
				if ( !firstDir ) {
					jsonFiles = getJsonFiles( file );
					firstDir = true;
				}
			}
		}
	}
	
	infosFiles.push( langDirs );
	infosFiles.push( jsonFiles );
	
	return infosFiles;
}


function getJsonFiles( dir ) {
	var files		= fs.readdirSync( 'www/src/json/' + dir );
	var jsonFiles	= [];
	
	var file;
	
	for ( var i = 0; i < files.length; i++ ) {
		file		= files[i];
		
		if ( file[0] !== '.' )
			jsonFiles.push( file );
	}
	
	return jsonFiles;
}



gulp.task( 'json-concat', function() {
	
	// var jsonFiles = getJsonFiles();
	// console.log(jsonFiles);
	
	var files		= fs.readdirSync( 'www/src/json/' );
	var jsonFiles	= null;
	var infosFiles	= getInfosFiles( files );
	var langDirs	= infosFiles[0];
	var jsonFiles	= infosFiles[1];
	
	// console.log(files.length);
	// console.log('FILES', files);
	
	
	// console.log('LANG DIRS :', langDirs);
	// console.log('LIST FILES :', jsonFiles);
	
	
	var content;
	var jsonFile, lang, data;
	for ( var i = 0; i < jsonFiles.length; i++ ) {
	// for ( var i = 0; i < 1; i++ ) {
		jsonFileName = jsonFiles[i];
		
		content = '{\n\n\n\n';
		
		for ( var j = 0; j < langDirs.length; j++ ) {
			console.log('LANG :', langDirs[j]);
			lang = langDirs[j];
			
			
			content += '"' + lang + '" : ';
			
			data = '\t' + fs.readFileSync( 'www/src/json/' + lang + '/' + jsonFileName, 'utf8' );
			content += data;
			
			if( j < langDirs.length-1 )
				content += ',\n\n\n\n';
		}
		
		content += '\n\n\n\n}';
		
		// console.log(content);
		
		
		
		fs.writeFileSync( 'www/src/json/' + jsonFileName, content, 'utf8' );
		
	}
	
	
	
	/*
	console.log('www/src/json/' + langDirs[0] + '/' + jsonFiles[0]);
	var data = fs.readFileSync( 'www/src/json/' + langDirs[0] + '/' + jsonFiles[0], 'utf8' );
	console.log(data);
	
	
	// fs.writeFile( 'www/src/json/pages.json', data, function (err) {
	fs.writeFileSync( 'www/src/json/pages_yo.json', data, 'utf8' );
	*/
	
	
	
	
	
	
	
	
	
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
	
});