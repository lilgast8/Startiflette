var gulp	= require( 'gulp' );
var path	= require( 'path' );

var options	= require( '../utils/options' );
var paths	= require( '../utils/paths' );

var fs		= require( 'fs' );
var plumber	= require( 'gulp-plumber' );



gulp.task( 'json-concat', function() {
	
	console.log(paths.src.jsonConfigFile);
	
	// var configFile = fs.readdirSync( paths.src.jsonConfigFile );
	var configFile = fs.readFileSync( paths.src.jsonConfigFile, 'utf8' );
	// var configFile = require( paths.src.jsonConfigFile );
	// console.log(configFile);
	var config = JSON.parse(configFile);
	// console.log(configFile.PROD);
	
	
	// for (var i = 0; i < config.LANGUAGES.length; i++) {
	// 	console.log(config.LANGUAGES[i]);
	// }
	
	
	for (var i = 0; i < config.ROUTES_FILES.length; i++) {
		console.log(config.ROUTES_FILES[i]);
	}
	
	
	
	/*
	var files		= fs.readdirSync( paths.src.json );
	var infosFiles	= getInfosFiles( files );
	var langDirs	= infosFiles[0];
	var jsonFiles	= infosFiles[1];
	
	var jsonFile, lang, data;
	
	// parse json files
	for ( var i = 0; i < jsonFiles.length; i++ ) {
		jsonFileName = jsonFiles[i];
		
		data = '{\n\n\n\n';
		
		// parse language directories
		for ( var j = 0; j < langDirs.length; j++ ) {
			lang = langDirs[j];
			
			data += '"' + lang + '" : ';
			data += '\t' + fs.readFileSync( paths.src.json + lang + '/' + jsonFileName, 'utf8' );
			
			if ( j < langDirs.length-1 )
				data += ',\n\n\n\n';
		}
		
		data += '\n\n\n\n}';
		
		fs.writeFileSync( paths.src.json + jsonFileName, data, 'utf8' );
	}
	
	
	// lint concat JSON
	options.jsonSrcPath = paths.src.jsonConcatFiles;
	gulp.start( 'json-lint' );
	*/
});



function getInfosFiles( files ) {
	var infosFiles	= [];
	var langDirs	= [];
	var jsonFiles	= [];
	var firstDir	= false;
	var file, filePath, fileInfo;
	
	// parse files
	for ( var i = 0; i < files.length; i++ ) {
		file = files[i];
		
		if ( file[0] !== '.' ) { // if filename don't begin by a '.'
			filePath = paths.src.json + file;
			fileInfo = fs.statSync( filePath );
			
			if ( fileInfo.isDirectory() ) { // if file is a directory
				langDirs.push(file); // stock language directories
				
				if ( !firstDir ) { // if it's first directory, parse files in it to get json files list
					jsonFiles = getJsonFiles( file ); // get json filenames
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
	var files		= fs.readdirSync( paths.src.json + dir );
	var jsonFiles	= [];
	var file;
	
	// parse json files
	for ( var i = 0; i < files.length; i++ ) {
		file = files[i];
		
		if ( file[0] !== '.' ) // if filename don't begin by a '.'
			jsonFiles.push( file ); // stock json filenames
	}
	
	return jsonFiles;
}