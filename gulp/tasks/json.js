var gulp	= require( 'gulp' );

var options	= require( '../utils/options' );
var paths	= require( '../utils/paths' );



gulp.task( 'json', [ 'json-lint' ], function() {
	
	if ( options.task == 'default' && options.fileName == 'js-files.json' ) {
		options.jsFileChanged = true;
		gulp.start( 'js' );
	}
	
	else if ( options.task == 'default' && options.fileName == 'config.json' )
		gulp.start( 'htaccess' );
	
	else if ( options.task == 'prod' || options.task == 'json' || options.htmlify )
		gulp.start( 'json-min' );
	
} );