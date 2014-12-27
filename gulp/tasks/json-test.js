var gulp		= require( 'gulp' );

var options		= require( '../utils/options' );
var paths		= require( '../utils/paths' );

var plumber		= require( 'gulp-plumber' );
var notify		= require( 'gulp-notify' );
var jsonlint	= require( 'gulp-jsonlint' );



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
	
	var rootDir = paths.src.json;
	var dirs, file, filePath, files, stat, _i, _len;
	files = fs.readdirSync(rootDir);
	dirs = [];
	
	for (_i = 0, _len = files.length; _i < _len; _i++) {
		file = files[_i];
		
		console.log('file[0] : ', file[0]);
		if (file[0] !== '.') {
			filePath = "" + rootDir + "/" + file;
			stat = fs.statSync(filePath);
			
			console.log('file : ', filePath, stat.isDirectory());
			
			
			if (stat.isDirectory()) {
				dirs.push(file);
			}
		}
	}
	// return dirs;
	console.log(dirs);
	
	
	/*
	for(var i=0; i<jsonFiles.length; i++) {
		fileName = jsonFiles[i];
		
		if(fileName.indexOf('.') == -1)
			jsonFolder.push(fileName);
	}
	console.log(jsonFolder);
	*/
	
	
	// var jsonFiles	= fs.readdir(paths.src.json);
	
	// for(var i=0; i<jsonFiles.length; i++) {
		
	// }
	
	// function getFiles(dir,files_){
	//     files_ = files_ || [];
	//     if (typeof files_ === 'undefined') files_=[];
	//     var files = fs.readdirSync(dir);
	//     for(var i in files){
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