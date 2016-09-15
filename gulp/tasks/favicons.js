var gulp			= require( 'gulp' );

var options			= require( '../utils/options' );
var paths			= require( '../utils/paths' );

var plumber			= require( 'gulp-plumber' );
var realFavicon		= require( 'gulp-real-favicon' );
var fs				= require( 'fs' );

var globalConfig	= require( '../../' + paths.env.dev + paths.configs.configFile );



gulp.task( 'favicons', [ 'favicons:generate' ], function() {
	
	gulp.start( 'favicons:dev' );
	
});


gulp.task( 'favicons:dev', [ 'favicons:manage-markups' ], function() {
	
	if ( options.task == 'favicons' )
		gulp.start( 'move' );
	
});


// Generate the icons. This task takes a few seconds to complete. 
// You should run it at least once to create the icons. Then, 
// you should run it whenever RealFaviconGenerator updates its 
// package (see the favicons:check-update task below).
gulp.task( 'favicons:generate', [ 'delete' ], function( done ) {
	
	var configFile	= fs.readFileSync( paths.env.dev + paths.configs.favicons.configFile, 'utf8' );
	var config		= JSON.parse( configFile );
	
	realFavicon.generateFavicon({
		masterPicture:	paths.env.dev + paths.configs.favicons.dir + config.url,
		dest:			paths.env.dev + paths.assets.favicons.dir,
		iconsPath:		globalConfig.ENVS.prod.base_url + paths.assets.favicons.dir,
		design:			{
			
			ios: {
				master_picture: {
					content:		paths.env.dev + paths.configs.favicons.dir + config.ios.url
				},
				pictureAspect:		'backgroundAndMargin',
				backgroundColor:	 config.ios.bg,
				margin:				'28%'
			},
			
			desktopBrowser: {},
			
			windows: {
				master_picture: {
					content:		paths.env.dev + paths.configs.favicons.dir + config.windows.url
				},
				pictureAspect:		'noChange',
				backgroundColor:	config.windows.bg,
				onConflict:			'override'
			},
			
			androidChrome: {
				master_picture: {
					content: 		paths.env.dev + paths.configs.favicons.dir + config.android.url
				},
				pictureAspect:		'backgroundAndMargin',
				margin:				'20%',
				backgroundColor:	config.android.bg,
				themeColor:			config.android.theme,
				manifest: 			{
					name:				config.android.name,
					display:			'browser',
					orientation:		'notSet',
					onConflict:			'override',
					declared:			true
				}
			},
			
			safariPinnedTab: {
				pictureAspect:	'silhouette',
				themeColor:		config.safari.theme
			}
		},
		
		settings: {
			scalingAlgorithm:		'Mitchell',
			errorOnImageTooSmall:	false
		},
		
		markupFile: paths.env.dev + paths.configs.favicons.dataFile
		
	}, function() {
		done();
	});
	
});


gulp.task( 'favicons:manage-markups', [ 'favicons:inject-markups' ], function() {
	
	var filePath	= paths.env.dev + paths.server.views.shared.dir + 'favicons.twig';
	var data		= fs.readFileSync( filePath, 'utf8' );
	
	data			= data.replace( new RegExp( '\\' + globalConfig.ENVS.prod.base_url + 'assets/favicons/', 'g' ), '{{ Path.URL.favicons }}' );
	data			= data.replace( new RegExp( '\\' + '<!--', 'g' ), '\n	<!--' );
	data			= data.replace( new RegExp( '\\' + '<link', 'g' ), '	<link' );
	data			= data.replace( new RegExp( '\\' + '<meta', 'g' ), '	<meta' );
	data			+= '\n';
	
	fs.writeFileSync( filePath, data, 'utf8' );
	
});


// Inject the favicon markups in your HTML pages. You should run 
// this task whenever you modify a page. You can keep this task 
// as is or refactor your existing HTML pipeline.
gulp.task( 'favicons:inject-markups', function() {
	
	return gulp.src( paths.env.dev + paths.configs.favicons.srcFile )
		.pipe( plumber() )
		.pipe( realFavicon.injectFaviconMarkups(
			JSON.parse( fs.readFileSync( paths.env.dev + paths.configs.favicons.dataFile ) ).favicon.html_code
		) )
		.pipe( gulp.dest( paths.env.dev + paths.server.views.shared.dir ) );
	
});


// Check for updates on RealFaviconGenerator (think: Apple has just
// released a new Touch icon along with the latest version of iOS).
// Run this task from time to time. Ideally, make it part of your 
// continuous integration system.
gulp.task( 'favicons:check-update', function( done ) {
	
	var currentVersion = JSON.parse( fs.readFileSync( paths.env.dev + paths.configs.favicons.dataFile ) ).version;
	
	realFavicon.checkForUpdates( currentVersion, function( err ) {
		if ( err )
			throw err;
	});
	
});