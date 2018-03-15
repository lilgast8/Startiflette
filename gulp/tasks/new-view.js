var gulp		= require( 'gulp' );

var options		= require( '../utils/options' );
var paths		= require( '../utils/paths' );
var helpers		= require( '../utils/helpers' );

var gutil		= require( 'gulp-util' );
var inquirer	= require( 'inquirer' );
var fs			= require( 'fs' );



gulp.task( 'new-view', function() {
	
	var DEFAULT_NAME = 'new view';
	
	setTimeout( showDialogue.bind( this, DEFAULT_NAME ), 0 );
	
} );



function showDialogue( DEFAULT_NAME ) {
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
				type:		'confirm',
				name:		'createTwig',
				message:	gutil.colors.green( 'Create a Twig file?' ),
				default:	true
			},
			{
				type:		'confirm',
				name:		'createSCSS',
				message:	gutil.colors.green( 'Create a SCSS view?' ),
				default:	true
			},
			{
				type:		'confirm',
				name:		'createJS',
				message:	gutil.colors.green( 'Create a JS view?' ),
				default:	true
			},
			{
				type:		'confirm',
				name:		'createContent',
				message:	gutil.colors.green( 'Create a content file?' ),
				default:	false
			},
			{
				type:		'confirm',
				name:		'createController',
				message:	gutil.colors.green( 'Create a controller?' ),
				default:	false
			},
			{
				type:		'confirm',
				name:		'createNewView',
				message:	gutil.colors.green( 'Create the new views?' ),
				default:	false
			}
		] ).then( function( answers ) {
			
			if ( !answers.createNewView ) {
				console.log( gutil.colors.cyan( 'New files wasn\'t created.' ) );
				
				return;
			}
			
			
			var currentJsAppName			= helpers.getJsAppName();
			
			var viewType					= answers.viewType + 's';
			var createTwig					= answers.createTwig;
			var createSCSS					= answers.createSCSS;
			var createJS					= answers.createJS;
			var createContent				= answers.createContent;
			var createController			= answers.createController;
			
			var fileNameLowerCase			= answers.viewName.toLowerCase();
			var fileNameUpperCase			= answers.viewName.toUpperCase();
			var fileNameCapitalize			= helpers.upperCaseFirstLetter( answers.viewName );
			var fileNameTitleCase			= helpers.titleCase( answers.viewName );
			var fileNameTitleCaseNoSpace	= fileNameTitleCase.replace( / /g, '' );
			var dashedFileName				= fileNameLowerCase.replace( / /g, '-' );
			
			var twigFileName				= dashedFileName + '.twig';
			var scssFileName				= '_' + dashedFileName + '.scss';
			var jsFileName					= fileNameTitleCaseNoSpace + '.js';
			var contentFileName				= dashedFileName + '.php';
			var controllerFileName			= fileNameTitleCaseNoSpace + '.php';
			
			var cssClassName				= helpers.lowerCaseFirstLetter( fileNameTitleCaseNoSpace );
			var contentClassName			= fileNameTitleCaseNoSpace + 'Content';
			var controllerClassName			= fileNameTitleCaseNoSpace;
			var jsViewType					= helpers.titleCase( viewType );
			var jsClassName					= fileNameTitleCaseNoSpace;
			
			
			// twig view
			if ( createTwig )
				manageFileCreation(	'view-name-view.twig',
									viewType,
									paths.env.dev + paths.server.views[ options.device ][ viewType ] + twigFileName,
									[ 'View name', 'viewClassName' ],
									[ fileNameCapitalize, cssClassName ] );
			
			// css file
			if ( createSCSS )
				manageFileCreation(	'_view-name.scss',
									viewType,
									paths.env.dev + paths.assets.css.app[ options.device ][ viewType ] + scssFileName,
									[ 'View name', 'viewClassName' ],
									[ fileNameUpperCase, cssClassName ] );
			
			// js file
			if ( createJS )
				manageFileCreation(	'ViewName.js',
									viewType,
									paths.env.dev + paths.assets.js.app[ options.device ].views[ viewType ] + jsFileName,
									[ 'STF', 'ViewType', 'ViewName' ],
									[ currentJsAppName, jsViewType, jsClassName ] );
			
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
		}
	);
}


function manageFileCreation( file, viewType, destFilePath, aStringToReplace, aNewString ) {
	var config	= require( '../../' + paths.env.dev + paths.configs.configFile );
	var data	= fs.readFileSync( paths.env.base + file, 'utf8' );
	var stringToReplace, newString;
	
	for ( var i = 0; i < aStringToReplace.length; i++ ) {
		stringToReplace	= aStringToReplace[i];
		newString		= aNewString[i];
		
		data			= data.replace( new RegExp( stringToReplace, 'g' ), newString );
	}
	
	if ( file == 'view-name-view.twig' && viewType != 'pages' )
		data = '';
	
	else if ( file == 'ViewName.js' && viewType == 'pages' )
		data = data.replace( new RegExp( 'AbstractView', 'g' ), 'AbstractPageView' );
	
	else if ( file == 'ViewName.js' && viewType == 'statics' )
		data = data.replace( '};', '}();' );
	
	
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