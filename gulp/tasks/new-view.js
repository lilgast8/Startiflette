var gulp		= require( 'gulp' );

var options		= require( '../utils/options' );
var paths		= require( '../utils/paths' );
var helpers		= require( '../utils/helpers' );

var gutil		= require( 'gulp-util' );
var inquirer	= require( 'inquirer' );
var fs			= require( 'fs' );

var config		= require( '../../' + paths.env.dev + paths.configs.configFile );



gulp.task( 'new-view', function() {
	
	var DEFAULT_NAME		= 'new view';
	var SHORT_DEFAULT_NAME	= 'n vi';
	
	setTimeout( showDialogue.bind( this, DEFAULT_NAME, SHORT_DEFAULT_NAME ), 0 );
	
} );



function showDialogue( DEFAULT_NAME, SHORT_DEFAULT_NAME ) {
	inquirer.prompt(
		[
			{
				type:		'list',
				name:		'viewType',
				message:	gutil.colors.green( 'Type of the view?' ),
				choices:	[ 'page', 'partial', 'static' ],
				default:	'page'
			},
			{
				type:		'input',
				name:		'viewName',
				message:	gutil.colors.green( 'Name of the new view:' ),
				default:	DEFAULT_NAME,
				validate:	function( input ) {
					var done = this.async();
					
					if ( input == DEFAULT_NAME ) {
						console.log( gutil.colors.red( '\nWARNING!: You need to provide a name!' ) );
						return;
					}
					
					else if ( helpers.checkSpecialChars( input, true ) ) {
						console.log( gutil.colors.red( '\nWARNING!: Name should not contain any special characters or symbols! Use only alphanumeric characters.' ) );
						return;
					}
					
					else
						done( null, true );
				}
			},
			{
				type:		'input',
				name:		'shortViewName',
				message:	gutil.colors.green( 'Short name of the new view:' ),
				default:	SHORT_DEFAULT_NAME,
				validate:	function( input ) {
					var done = this.async();
					
					if ( input == SHORT_DEFAULT_NAME ) {
						console.log( gutil.colors.red( '\nWARNING!: You need to provide a short name!' ) );
						return;
					}
					
					else if ( helpers.checkSpecialChars( input, true ) ) {
						console.log( gutil.colors.red( '\nWARNING!: Name should not contain any special characters or symbols! Use only alphanumeric characters.' ) );
						return;
					}
					
					else
						done( null, true );
				}
			},
			{
				type:		'confirm',
				name:		'createContent',
				message:	gutil.colors.green( 'Create a content file?' ),
				default:	true
			},
			{
				type:		'confirm',
				name:		'createController',
				message:	gutil.colors.green( 'Create a specific controller?' ),
				default:	false
			},
			{
				type:		'confirm',
				name:		'createJS',
				message:	gutil.colors.green( 'Create a specific JS view?' ),
				default:	true
			},
			{
				type:		'confirm',
				name:		'createNewView',
				message:	gutil.colors.green( 'Create the new view?' ),
				default:	false
			}
		] ).then( function( answers ) {
			
			if ( !answers.createNewView ) {
				console.log( gutil.colors.cyan( 'New files wasn\'t created.' ) );
				
				return;
			}
			
			var currentJsAppName			= helpers.getJsAppName();
			
			var viewType					= answers.viewType + 's';
			var createContent				= answers.createContent;
			var createController			= answers.createController;
			var createJS					= answers.createJS;
			
			var fileNameLowerCase			= answers.viewName.toLowerCase();
			var fileNameUpperCase			= answers.viewName.toUpperCase();
			var fileNameCapitalize			= helpers.upperCaseFirstLetter( answers.viewName );
			var fileNameTitleCase			= helpers.titleCase( answers.viewName );
			var fileNameTitleCaseNoSpace	= fileNameTitleCase.replace( / /g, '' );
			var dashedFileName				= fileNameLowerCase.replace( / /g, '-' );
			var shortName					= answers.shortViewName != SHORT_DEFAULT_NAME ? answers.shortViewName : answers.viewName;
			var shortNameTitleCase			= helpers.titleCase( shortName );
			var shortNameTitleCaseNoSpace	= shortNameTitleCase.replace( / /g, '' );
			
			var cssFileName			= '_' + dashedFileName + '.scss';
			var twigFileName		= dashedFileName + '.twig';
			var contentFileName		= dashedFileName + '.php';
			var controllerFileName	= fileNameTitleCaseNoSpace + '.php';
			var jsFileName			= fileNameTitleCaseNoSpace + '.js';
			
			var cssClassName		= helpers.lowerCaseFirstLetter( shortNameTitleCaseNoSpace );
			var contentClassName	= fileNameTitleCaseNoSpace + 'Content';
			var controllerClassName	= fileNameTitleCaseNoSpace;
			var jsFileName			= fileNameTitleCaseNoSpace + '.js';
			var jsViewType			= helpers.titleCase( viewType );
			var jsClassName			= fileNameTitleCaseNoSpace;
			
			
			// css
			manageFileCreation(	'_view-name.scss',
								viewType,
								paths.env.dev + paths.assets.css.app[ options.device ][ viewType ] + cssFileName,
								[ 'VIEW NAME', 'viewClassName' ],
								[ fileNameUpperCase, cssClassName ] );
			
			// twig view
			manageFileCreation(	'view-name-view.twig',
								viewType,
								paths.env.dev + paths.server.views[ options.device ][ viewType ] + twigFileName,
								[ 'View name', 'viewClassName' ],
								[ fileNameCapitalize, cssClassName ] );
			
			// content
			if ( createContent )
				manageFileCreation(	'view-name-content.php',
								viewType,
								paths.env.dev + paths.server.contents + 'LANG/' + viewType + '/' + contentFileName,
								[ 'ViewNameContent', 'View name' ],
								[ contentClassName, fileNameCapitalize ] );
			
			// controller
			if ( createController )
				manageFileCreation(	'ViewNameController.php',
								viewType,
								paths.env.dev + paths.server.core.controllers[ viewType ] + controllerFileName,
								[ 'ViewNameController' ],
								[ controllerClassName ] );
			
			// js
			if ( createJS )
				manageFileCreation(	'ViewName.js',
								viewType,
								paths.env.dev + paths.assets.js.app[ options.device ].views[ viewType ] + jsFileName,
								[ 'STF', 'ViewType', 'ViewName' ],
								[ currentJsAppName, jsViewType, jsClassName ] );
		}
	);
}


function manageFileCreation( file, viewType, destFilePath, aStringToReplace, aNewString ) {
	var data	= fs.readFileSync( paths.env.base + file, 'utf8' );
	var stringToReplace, newString;
	
	for ( var i = 0; i < aStringToReplace.length; i++ ) {
		stringToReplace	= aStringToReplace[i];
		newString		= aNewString[i];
		
		data			= data.replace( new RegExp( stringToReplace, 'g' ), newString );
	}
	
	if ( file == 'ViewName.js' && viewType == 'pages' ) {
		stringToReplace	= aNewString[0] + '.Views			= ' + aNewString[0] + '.Views';
		newString		= aNewString[0] + '.Views		= ' + aNewString[0] + '.Views';
		
		data			= data.replace( new RegExp( stringToReplace, 'g' ), newString );
		
		data			= data.replace( new RegExp( 'AbstractView', 'g' ), 'AbstractPageView' );
	}
	
	if ( file == 'ViewName.js' && viewType == 'statics' )
		data = data.replace( 'return ' + newString, 'return new ' + newString + '()' );
	
	
	if ( file == 'view-name-content.php' ) { // necessary to create a file for each language
		var lang, destFilePathTemp, destDirPath, dataTemp;
		
		for ( var i = 0; i < config.ALL_LANG.length; i++ ) {
			lang = config.ALL_LANG[i];
			
			destFilePathTemp	= destFilePath.replace( 'LANG', lang );
			destDirPath			= destFilePathTemp.split( '/' + viewType + '/' )[0] + '/';
			dataTemp			= data.replace( '/ LANG', ' / ' + lang );
			
			if ( !fs.existsSync( destDirPath ) ) {
				fs.mkdirSync( destDirPath );
				fs.mkdirSync( destDirPath + viewType + '/' );
				
				console.log( gutil.colors.cyan( 'INFO: ' + destDirPath + ' directory was created because it didn\'t exist.' ) );
			}
			
			createFile( destFilePathTemp, dataTemp );
		}
	}
	
	else
		createFile( destFilePath, data );
	
}


function createFile( destFilePath, data ) {
	if ( !fs.existsSync( destFilePath ) ) { // create file
		fs.writeFileSync( destFilePath, data, 'utf8' );
		
		console.log( gutil.colors.bgGreen( ' ' + destFilePath + ' ' ) + gutil.colors.green( ' file was succefully created.' ) );
	}
	
	else // if file already exists
		console.log( gutil.colors.red( 'WARNING!: ' ) + gutil.colors.bgRed( ' ' + destFilePath + ' ' ) + gutil.colors.red( ' file wasn\'t created because it already exists.' ) );
}