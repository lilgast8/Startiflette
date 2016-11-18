var gulp		= require( 'gulp' );

var paths		= require( '../utils/paths' );
var helpers		= require( '../utils/helpers' );

var gutil		= require( 'gulp-util' );
var inquirer	= require( 'inquirer' );
var recursive	= require( 'recursive-readdir' );
var fs			= require( 'fs' );



gulp.task( 'rename-js-app', function() {
	
	var currentJsAppName = helpers.getJsAppName();
	
	setTimeout( showDialogue.bind( this, currentJsAppName ), 0 );
	
} );



function showDialogue( currentJsAppName ) {
	inquirer.prompt(
		[
			{
				type:		'input',
				name:		'jsAppName',
				message:	gutil.colors.green( 'Named the JS app:' ),
				default:	currentJsAppName,
				validate:	function( input ) {
					var done = this.async();
					
					if ( input == currentJsAppName ) {
						console.log( gutil.colors.red( '\nWARNING!: You need to provide a name!' ) );
						return;
					}
					
					else if ( helpers.checkSpecialChars( input, false ) ) {
						console.log( gutil.colors.red( '\nWARNING!: Name should not contain any special characters, symbols or spaces! Use only alphanumeric characters.' ) );
						return;
					}
					
					else
						done( null, true );
				}
			},
			{
				type:		'confirm',
				name:		'namedJsApp',
				message:	gutil.colors.green( 'Rename JS app?' ),
				default:	false
			}
		] ).then( function( answers ) {
			
			if ( !answers.namedJsApp )
				return;
			
			var newJsAppName = answers.jsAppName.toUpperCase();
			
			recursive( paths.env.dev + paths.assets.js.app.dir, [ '.*' ], function ( err, filesList ) {
				
				var isInitFile, filePath;
				
				for ( var i = 0; i < filesList.length; i++ ) {
					filePath	= filesList[i].replace( /\\/g, '/' ); // replace \ by /, for Windaube users
					isInitFile	= filePath == paths.env.dev + paths.assets.js.app.initFile ? true : false;
					
					renameApp( filesList[i], currentJsAppName, newJsAppName, isInitFile );
				}
				
			});
			
			console.log( gutil.colors.cyan( 'App renamed from ' ), gutil.colors.bold( gutil.colors.magenta( currentJsAppName ) ), gutil.colors.cyan( ' to ' ), gutil.colors.bold( gutil.colors.magenta( newJsAppName ) ) );
			
		}
	);
}


function renameApp( filePath, currentJsAppName, newJsAppName, isInitFile ) {
	var stringToReplace	= isInitFile ? currentJsAppName : currentJsAppName + '\\.';
	var newString		= isInitFile ? newJsAppName : newJsAppName + '.';
	
	var data			= fs.readFileSync( filePath, 'utf8' );
	data				= data.replace( new RegExp( stringToReplace, 'g' ), newString );
	
	fs.writeFileSync( filePath, data, 'utf8' );
}