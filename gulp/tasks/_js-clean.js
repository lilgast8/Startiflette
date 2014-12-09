var gulp	= require( 'gulp' );

var paths	= require( '../utils/paths' );

var plumber	= require( 'gulp-plumber' );
var clean	= require( 'gulp-clean' );



gulp.task( 'js-clean', function() {
	
	return gulp.src([
		paths.assets.js+'**/*.js',
		'!'+paths.assets.jsLib+'html5shiv.js'
	], {read : false})
		.pipe(plumber())
		.pipe(clean());
	
});