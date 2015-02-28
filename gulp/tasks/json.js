var gulp	= require( 'gulp' );

var options	= require( '../utils/options' );
var paths	= require( '../utils/paths' );



gulp.task( 'json', ['json-lint'], function() {
	
	// if ( options.cleanPath === null )
	// 	options.cleanPath = paths.assets.json;
	
	// gulp.start( 'json-min' );
	
	console.log('JSON', options.cleanPath);
	
	// watch
	if ( !options.tasks.prod ) {
		console.log('watch');
		
		options.cleanPath = paths.src.jsonConcatFiles;
		
		// gulp.start( 'clean' );
		gulp.start( 'json-concat' );
	}
	
	// prod
	else {
		console.log('prod');
		
		options.cleanPath = paths.assets.json;
		
		gulp.start( 'json-min' );
	}
	
	console.log('JSON : ', paths.assets.json);
	
});