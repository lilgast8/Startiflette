var gulp		= require( 'gulp' );
var path	= require( 'path' );

var options		= require( '../utils/options' );
var paths		= require( '../utils/paths' );

var plumber		= require( 'gulp-plumber' );
var notify		= require( 'gulp-notify' );
var sass		= require( 'gulp-ruby-sass' );
var rename		= require( 'gulp-rename' );



gulp.task( 'sass', function() {
	
	for( var i = 0; i < options.srcPath.length; i++ ) {
		
		gulp.src( options.srcPath[i] )
			.pipe( plumber() )
			.pipe( sass({
				style: 'compressed',
				// style: 'expanded',
				compass: true
			}) )
			.on( 'error', function(error) {
				console.log( error.message );
				return notify().write( options.device + ': ' + path.basename( error.message ) );
			} )
			.pipe( rename( {suffix : '.min'} ) )
			.pipe( gulp.dest( paths.assets.css ) );
		
	}
	
});