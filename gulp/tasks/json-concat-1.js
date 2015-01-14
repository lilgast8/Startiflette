var gulp		= require( 'gulp' );
var path		= require( 'path' );

var options		= require( '../utils/options' );
var paths		= require( '../utils/paths' );

var plumber		= require( 'gulp-plumber' );
// var notify		= require( 'gulp-notify' );
// var jsonlint	= require( 'gulp-jsonlint' );
// var jsoncombine	= require( 'gulp-jsoncombine' );
// var concatjson	= require( 'gulp-concat-json' );



var fs = require('fs');

gulp.task( 'json-test', function() {
	
	// console.log(paths.src.json);
	
	// var files = fs.readdirSync(paths.src.json);
	/*
	var jsonFiles = fs.readdirSync(paths.src.json);
	var jsonFolder = [];
	
	console.log(jsonFiles);
	
	var fileName = null;
	*/
	
	var files = fs.readdirSync( paths.src.json );
	var dirs = [];
	
	var file, filePath, fileInfo;
	
	for ( i = 0; i < files.length; i++ ) {
		file = files[i];
		
		if ( file[0] !== '.' ) {
			filePath = paths.src.json + file;
			fileInfo = fs.statSync( filePath );
			
			if ( fileInfo.isDirectory() )
				dirs.push(file);
		}
	}
	// console.log(dirs);
	
	
	
	
	var jsonFiles = [];
	files = fs.readdirSync( paths.src.json + dirs[0] );
	// console.log(files);
	
	for ( i=0; i<files.length; i++ ) {
		file = files[i];
		
		
		// console.log(path.basename( file, '.json' ));
		// console.log(path.extname( file ));
		if( path.extname( file ) == '.json' )
			jsonFiles.push( file );
	}
	console.log(jsonFiles);
	
	
	
	
	// [
	// 		paths.src.json + 'fr/pages.json',
	// 		paths.src.json + 'en/pages.json',
	// 		paths.src.json + 'ex/pages.json'
	// 	]
	
	gulp.src( paths.src.json + '**/pages.json' )
	// gulp.src( [
	// 		paths.src.json + 'fr/pages.json',
	// 		paths.src.json + 'en/pages.json',
	// 		paths.src.json + 'ex/pages.json'
	// 	] )
		.pipe( plumber() )
    	.pipe( jsoncombine( 'pages.json', function(data) {
    		console.log('DATA', data);
    	}) )
    	.pipe( gulp.dest( paths.src.json ) );
	
	
	
	
	
	// gulp.src( paths.src.json + '**/pages.json' )
	/*
	gulp.src( [
			paths.src.json + 'fr/pages.json',
			paths.src.json + 'en/pages.json',
			paths.src.json + 'ex/pages.json'
		] )
		.pipe( plumber() )
		.pipe( concatjson( 'pages.json' ) )
		.pipe( gulp.dest( paths.src.json ) );
	*/
	
	
	/*
	for ( var i=0; i<jsonFiles.length; i++ ) {
		fileName = jsonFiles[i];
		
		if ( fileName.indexOf('.') == -1 )
			jsonFolder.push(fileName);
	}
	console.log(jsonFolder);
	*/
	
	
	// var jsonFiles	= fs.readdir(paths.src.json);
	
	// for ( var i=0; i<jsonFiles.length; i++ ) {
		
	// }
	
	// function getFiles(dir,files_){
	//     files_ = files_ || [];
	//     if (typeof files_ === 'undefined') files_=[];
	//     var files = fs.readdirSync(dir);
	//     for ( var i in files ) {
	//         if (!files.hasOwnProperty(i)) continue;
	//         var name = dir+'/'+files[i];
	//         if (fs.statSync(name).isDirectory()){
	//             getFiles(name,files_);
	//         } else {
	//             files_.push(name);
	//         }
	//     }
	//     return files_;
	// }
	// console.log(getFiles('path/to/dir'))
	
});