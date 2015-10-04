var gulp		= require( 'gulp' );

var options		= require( '../utils/options' );
var paths		= require( '../utils/paths' );

var inquirer	= require( 'inquirer' );
var fs			= require( 'fs' );

var config		= require( '../../' + paths.env.dev + paths.configs.config.configFile );



gulp.task( 'new-page', function() {
	
	var DEFAULT_NAME		= 'new page';
	var SHORT_DEFAULT_NAME	= 'n pa';
	
	inquirer.prompt(
		[
			{
				type:		'input',
				name:		'pageName',
				message:	'Name of the new page:',
				default:	DEFAULT_NAME
			},
			{
				type:		'input',
				name:		'shortPageName',
				message:	'Short name of the new page:',
				default:	SHORT_DEFAULT_NAME
			},
			{
				type:		'confirm',
				name:		'createNewPage',
				message:	'Create new page?'
			}
		], function( answers ) {
			
			if ( !answers.createNewPage )
				return;
			
			var fileNameLowerCase			= answers.pageName.toLowerCase();
			var fileNameUpperCase			= answers.pageName.toUpperCase();
			var fileNameCapitalize			= upperCaseFirstLetter( answers.pageName );
			var fileNameTitleCase			= titleCase ( answers.pageName );
			var fileNameTitleCaseNoSpace	= fileNameTitleCase.replace( / /g, '' );
			var dashedFileName				= fileNameLowerCase.replace( / /g, '-' );
			var shortName					= answers.shortPageName != SHORT_DEFAULT_NAME ? answers.shortPageName : answers.pageName;
			var shortNameTitleCase			= titleCase( shortName );
			var shortNameTitleCaseNoSpace	= shortNameTitleCase.replace( / /g, '' );
			
			var cssFileName			= '_' + dashedFileName + '.scss';
			var phpFileName			= dashedFileName + '.php';
			var jsFileName			= fileNameTitleCaseNoSpace + '.js';
			
			var cssClassName		= lowerCaseFirstLetter( shortNameTitleCaseNoSpace );
			var phpContentClassName	= fileNameTitleCaseNoSpace + 'Content';
			var phpContentVarName	= '$' + lowerCaseFirstLetter( shortNameTitleCaseNoSpace );
			var jsFileName			= fileNameTitleCaseNoSpace + '.js';
			var jsClassName			= fileNameTitleCaseNoSpace;
			
			
			// css
			createFile( '_page-name.scss',
						paths.env.dev + paths.assets.css.app.desktop.pages + cssFileName,
						[ 'PAGE NAME', 'pageClassName' ],
						[ fileNameUpperCase, cssClassName ] );
			
			// php view
			createFile( 'page-name-view.php',
						paths.env.dev + paths.server.views.desktop.pages + phpFileName,
						[ 'Page name', 'pageClassName', 'Page name' ],
						[ fileNameCapitalize, cssClassName, fileNameCapitalize ] );
			
			// php content
			createFile( 'page-name-content.php',
						paths.env.dev + paths.server.contents + 'LANG/' + phpFileName,
						[ 'PageNameContent', '$page', 'Page name' ],
						[ phpContentClassName, phpContentVarName, fileNameCapitalize ] );
			
			// js
			var currentJsAppName = getJsAppName();
			createFile( 'PageName.js',
						paths.env.dev + paths.assets.js.app.desktop.views.pages + jsFileName,
						[ 'STF', 'PageName' ],
						[ currentJsAppName, jsClassName ] );
		}
	);
	
} );



function titleCase( string ) {
	return string.replace( /\w\S*/g, function( txt ) {
		return txt[0].toUpperCase() + txt.substr(1).toLowerCase();
	});
}


function upperCaseFirstLetter( string ) {
	return string[0].toUpperCase() + string.slice(1);
}


function lowerCaseFirstLetter( string ) {
	return string[0].toLowerCase() + string.slice(1);
}


function createFile( file, destFilePath, aStringToReplace, aNewString ) {
	var data	= fs.readFileSync( paths.env.base + file, 'utf8' );
	var stringToReplace, newString;
	
	for ( var i = 0; i < aStringToReplace.length; i++ ) {
		stringToReplace	= aStringToReplace[i];
		newString		= aNewString[i];
		
		data			= data.replace( new RegExp( '\\' + stringToReplace, 'g' ), newString );
	}
	
	
	if ( file == 'page-name-content.php' ) { // necessary to create a file for each language
		var lang, destFilePathTemp, dataTemp;
		
		for ( var i = 0; i < config.ALL_LANG.length; i++ ) {
			lang = config.ALL_LANG[i];
			
			destFilePathTemp	= destFilePath.replace( 'LANG', lang );
			dataTemp			= data.replace( new RegExp( '\\' + aNewString[2], 'g' ), aNewString[2] + ' / ' + lang );
			
			fs.writeFileSync( destFilePathTemp, dataTemp, 'utf8' );
		}
	}
	else
		fs.writeFileSync( destFilePath, data, 'utf8' );
	
}


function getJsAppName() {
	var data		= fs.readFileSync( paths.env.dev + paths.assets.js.app.initFile, 'utf8' );
	var startPos	= data.indexOf( 'var ' ) + 4;
	var endPos		= data.indexOf( ' = ' );
	var jsAppName	= data.substring( startPos, endPos );
	
	return jsAppName;
}