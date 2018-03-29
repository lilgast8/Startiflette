var gulp	= require( 'gulp' );

var options	= require( '../utils/options' );
var server	= require( '../utils/server' );

var gutil	= require( 'gulp-util' );
var ftp		= require( 'vinyl-ftp' );



gulp.task( 'deploy', function( cb ) {
	
	var conn = ftp.create( server.config );
	
	
	if ( options.remove != 'true' && options.remove !== true )
		return gulp.src( server.globs, { base: server.base, buffer: false } )
			.pipe( conn.newerOrDifferentSize( server.dest ) )
			.pipe( conn.dest( server.dest ) );
	
	else {
		console.log( gutil.colors.bgMagenta( ' ' + server.dest + ' ' ) + gutil.colors.magenta( ' directory deletion in progress....' ) );
		
		conn.rmdir( server.dest, function ( err ) {
			if ( err )
				return cb( err );
			else {
				console.log( gutil.colors.bgMagenta( ' ' + server.dest + ' ' ) + gutil.colors.magenta( ' directory removed.' ) );
				
				return gulp.src( server.globs, { base: server.base, buffer: false } )
					.pipe( conn.newerOrDifferentSize( server.dest ) )
					.pipe( conn.dest( server.dest ) );
			}
		} );
	}
	
} );