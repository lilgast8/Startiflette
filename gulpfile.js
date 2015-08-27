var gulp		= require( 'gulp' );
module.exports	= gulp; // used for gulp-devtools

var requireDir	= require( 'require-dir' );
var dir			= requireDir( './gulp/tasks/' );

var options		= require( './gulp/utils/options' );



/* Init */
gulp.task( 'init', [
	'delete'
] );


/* Default - Dev */
gulp.task( 'default', [
	'watch'
] );


/* Prod */
gulp.task( 'prod', ['delete'], function() {
	
	options.subtask = 'prod-deleted';
	
	gulp.start( 'sass' );
	gulp.start( 'js' );
	gulp.start( 'json' );
	gulp.start( 'image' );
	
} );

/*gulp.task( 'prod', ['delete'], function() {
	options.subtask = 'prod-deleted';
	gulp.start( 'prod-thing' );
} );

gulp.task( 'prod-thing', [
	'sass',
	'js',
	'json',
	'image'
], function() {
	
	console.log('move shit');
	gulp.start( 'move' );
	
} );*/



/*


var paths	= require( './gulp/utils/paths' );
var plumber	= require( 'gulp-plumber' );
gulp.task( 'move-sass', ['sass'], function() {
	
	gulp.src( paths.env.dev + paths.assets.css.minAllFiles )
		.pipe( plumber() )
		.pipe( gulp.dest( paths.env.prod + paths.assets.css.dir ) );
	
} );





gulp.task( 'prod', ['delete'], function() {
	
	options.subtask = 'prod-deleted';
	
	gulp.start( 'prod-thing' );
	
} );

gulp.task( 'prod-thing', [
	'sass',
	'js',
	'json',
	'image'
], function() {
	
	// console.log('move shit');
	// gulp.start( 'move' );
	
} );






gulp.task('one', function(cb) {
	// do stuff -- async or otherwise

	console.log('one');

	cb(err); // if err is not null and not undefined, the orchestration will stop, and 'two' will not run
});

// identifies a dependent task must be complete before this one begins
gulp.task('two', ['one'], function() {
	// task 'one' is done now
	console.log('two');
});

// gulp.task('test', ['one', 'two']);
gulp.task('test', ['two'], function() {
	console.log('test');
});


*/

