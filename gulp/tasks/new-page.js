var gulp		= require( 'gulp' );

var options		= require( '../utils/options' );
var paths		= require( '../utils/paths' );
var helpers		= require( '../utils/helpers' );

var gutil		= require( 'gulp-util' );
var inquirer	= require( 'inquirer' );
var fs			= require( 'fs' );

var config		= require( '../../' + paths.env.dev + paths.configs.config.configFile );



gulp.task( 'new-page', function() {
	
	var DEFAULT_NAME		= 'new page';
	var SHORT_DEFAULT_NAME	= 'n pa';
	
	setTimeout( showDialogue.bind( this, DEFAULT_NAME, SHORT_DEFAULT_NAME ), 0 );
	
} );



function showDialogue( DEFAULT_NAME, SHORT_DEFAULT_NAME ) {
	inquirer.prompt(
		[
			{
				type:		'input',
				name:		'pageName',
				message:	gutil.colors.green( 'Name of the new page:' ),
				default:	DEFAULT_NAME,
				validate:	function( input ) {
					var done = this.async();
					
					if ( input == 'new page' ) {
						console.log( gutil.colors.red( '\nWARNING!: You need to provide a name!' ) );
						return;
					}
					
					else if ( checkSpecialChars( input ) ) {
						console.log( gutil.colors.red( '\nWARNING!: Name should not contain any special characters or symbols! Use only alphanumeric characters.' ) )
						return;
					}
					
					else
						done( true );
				}
			},
			{
				type:		'input',
				name:		'shortPageName',
				message:	gutil.colors.green( 'Short name of the new page:' ),
				default:	SHORT_DEFAULT_NAME,
				validate:	function( input ) {
					var done = this.async();
					
					if ( input == 'n pa' ) {
						console.log( gutil.colors.red( '\nWARNING!: You need to provide a short name!' ) );
						return;
					}
					
					else if ( checkSpecialChars( input ) ) {
						console.log( gutil.colors.red( '\nWARNING!: Name should not contain any special characters or symbols! Use only alphanumeric characters.' ) )
						return;
					}
					
					else
						done( true );
				}
			},
			{
				type:		'confirm',
				name:		'createNewPage',
				message:	gutil.colors.green( 'Create new page?' ),
				default:	false
			}
		], function( answers ) {
			
			if ( !answers.createNewPage ) {
				console.log( gutil.colors.cyan( 'New files wasn\'t created.' ) );
				
				return;
			}
			
			var currentJsAppName			= helpers.getJsAppName();
			
			var fileNameLowerCase			= answers.pageName.toLowerCase();
			var fileNameUpperCase			= answers.pageName.toUpperCase();
			var fileNameCapitalize			= helpers.upperCaseFirstLetter( answers.pageName );
			var fileNameTitleCase			= helpers.titleCase( answers.pageName );
			var fileNameTitleCaseNoSpace	= fileNameTitleCase.replace( / /g, '' );
			var dashedFileName				= fileNameLowerCase.replace( / /g, '-' );
			var shortName					= answers.shortPageName != SHORT_DEFAULT_NAME ? answers.shortPageName : answers.pageName;
			var shortNameTitleCase			= helpers.titleCase( shortName );
			var shortNameTitleCaseNoSpace	= shortNameTitleCase.replace( / /g, '' );
			
			var cssFileName			= '_' + dashedFileName + '.scss';
			var phpFileName			= dashedFileName + '.php';
			var jsFileName			= fileNameTitleCaseNoSpace + '.js';
			
			var cssClassName		= helpers.lowerCaseFirstLetter( shortNameTitleCaseNoSpace );
			var phpContentClassName	= fileNameTitleCaseNoSpace + 'Content';
			var phpContentVarName	= '$' + helpers.lowerCaseFirstLetter( shortNameTitleCaseNoSpace );
			var jsFileName			= fileNameTitleCaseNoSpace + '.js';
			var jsClassName			= fileNameTitleCaseNoSpace;
			
			
			// css
			manageFileCreation(	'_page-name.scss',
								paths.env.dev + paths.assets.css.app[ options.device ].pages + cssFileName,
								[ 'PAGE NAME', 'pageClassName' ],
								[ fileNameUpperCase, cssClassName ] );
			
			// php view
			manageFileCreation(	'page-name-view.php',
								paths.env.dev + paths.server.views[ options.device ].pages + phpFileName,
								[ 'Page name', 'pageClassName', 'Page name' ],
								[ fileNameCapitalize, cssClassName, fileNameCapitalize ] );
			
			// php content
			manageFileCreation(	'page-name-content.php',
								paths.env.dev + paths.server.contents + 'LANG/pages/' + phpFileName,
								[ 'PageNameContent', '$page', 'Page name' ],
								[ phpContentClassName, phpContentVarName, fileNameCapitalize ] );
			
			// js
			manageFileCreation(	'PageName.js',
								paths.env.dev + paths.assets.js.app[ options.device ].views.pages + jsFileName,
								[ 'STF', 'PageName' ],
								[ currentJsAppName, jsClassName ] );
		}
	);
}


function checkSpecialChars( string ) {
	var hasSpecialChars	= false;
	var allowedChars	= [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9' ];
	var char;
	
	for ( var i = 0; i < string.length; i++ ) {
		char = string[ i ];
		
		if ( char != ' ' && allowedChars.indexOf( char.toLowerCase() ) < 0 ) {
			hasSpecialChars = true;
			
			break;
		}
	}
	
	return hasSpecialChars;
}


function manageFileCreation( file, destFilePath, aStringToReplace, aNewString ) {
	var data	= fs.readFileSync( paths.env.base + file, 'utf8' );
	var stringToReplace, newString;
	
	for ( var i = 0; i < aStringToReplace.length; i++ ) {
		stringToReplace	= aStringToReplace[i];
		newString		= aNewString[i];
		
		data			= data.replace( new RegExp( '\\' + stringToReplace, 'g' ), newString );
	}
	
	
	if ( file == 'page-name-content.php' ) { // necessary to create a file for each language
		var lang, destFilePathTemp, destDirPath, dataTemp;
		
		for ( var i = 0; i < config.ALL_LANG.length; i++ ) {
			lang = config.ALL_LANG[i];
			
			destFilePathTemp	= destFilePath.replace( 'LANG', lang );
			destDirPath			= destFilePathTemp.split( '/pages/' )[0] + '/';
			dataTemp			= data.replace( '/ LANG', ' / ' + lang );
			
			if ( !fs.existsSync( destDirPath ) ) {
				fs.mkdirSync( destDirPath );
				fs.mkdirSync( destDirPath + 'pages/' );
				
				console.log( gutil.colors.cyan( 'INFO: ' + destDirPath + ' directory was created because it didn\'t exist.' ) );
			}
			
			createFile( destFilePathTemp, dataTemp );
		}
	}
	
	else
		createFile( destFilePath, data );
	
}


function createFile( destFilePath, data ) {
	if ( !fs.existsSync( destFilePath ) ) // create file
		fs.writeFileSync( destFilePath, data, 'utf8' );
	
	else // if file already exists
		console.log( gutil.colors.red( 'WARNING!: ' + destFilePath + ' file wasn\'t created because it already exists.' ) );
}