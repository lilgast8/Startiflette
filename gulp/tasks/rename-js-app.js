var gulp		= require( 'gulp' );

var options		= require( '../utils/options' );
var paths		= require( '../utils/paths' );

var inquirer	= require( 'inquirer' );
var recursive	= require( 'recursive-readdir' );
var fs			= require( 'fs' );



gulp.task( 'rename-js-app', function() {
	
	var currentJsAppName = getJsAppName();
	
	inquirer.prompt(
		[
			{
				type:		'input',
				name:		'jsAppName',
				message:	'Named the JS app:',
				default:	'current name is: ' + currentJsAppName
			},
			{
				type:		'confirm',
				name:		'namedJsApp',
				message:	'Rename JS app?'
			}
		], function( answers ) {
			
			if ( !answers.namedJsApp )
				return;
			
			var newJsAppName = answers.jsAppName.toUpperCase();
			
			recursive( paths.env.dev + paths.assets.js.app.dir, [ '.*' ], function ( err, filesList ) {
				
				var isInitFile;
				
				for ( var i = 0; i < filesList.length; i++ ) {
					isInitFile = filesList[i] == paths.env.dev + paths.assets.js.app.initFile ? true : false;
					
					renameApp( filesList[i], currentJsAppName, newJsAppName, isInitFile );
				}
				
			});
			
		}
	);
	
} );



function getJsAppName() {
	var data		= fs.readFileSync( paths.env.dev + paths.assets.js.app.initFile, 'utf8' );
	var startPos	= data.indexOf( 'var ' ) + 4;
	var endPos		= data.indexOf( ' = ' );
	var jsAppName	= data.substring( startPos, endPos );
	
	return jsAppName;
}


function renameApp( filePath, currentJsAppName, newJsAppName, isInitFile ) {
	var stringToReplace	= isInitFile ? currentJsAppName : currentJsAppName + '.';
	var newString		= isInitFile ? newJsAppName : newJsAppName + '.';
	
	var data			= fs.readFileSync( filePath, 'utf8' );
	data				= data.replace( new RegExp( '\\' + stringToReplace, 'g' ), newString );
	
	fs.writeFileSync( filePath, data, 'utf8' );
}