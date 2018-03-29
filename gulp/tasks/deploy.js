var gulp	= require( 'gulp' );

var options	= require( '../utils/options' );
var server	= require( '../utils/server' );

var gutil	= require( 'gulp-util' );
var ftp		= require( 'vinyl-ftp' );



gulp.task( 'deploy', function( cb ) {
	
	var conn = ftp.create( server.config );
	
	
	console.log( '🐗', options.remove, typeof options.remove );
	
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
	
	
	/*conn.rmdir( server.dest, function ( err ) {
		if ( err )
			return cb( err );
		
		return gulp.src( server.globs, { base: server.base, buffer: false } )
			.pipe( conn.newerOrDifferentSize( server.dest ) )
			.pipe( conn.dest( server.dest ) );
	} );*/
	
	
	/*conn.rmdir( path, function ( err ) {
		if ( err )
			return cb( err );
		else {
			gulp.src( globs, opts )
				.pipe( conn.newer( path ) )
				.pipe( conn.dest( path ) );
		}  
	});*/
	
	
	/*
	conn.rmdir( 'a', function( e ) {
		console.log( '🦄', e );
	} );
	// conn.rmdir( 'a', cb );
	
	return gulp.src( server.globs, { base: 'yolo', buffer: false } )
		// .pipe( conn.clean( 'www/**', 'www/' ) )
		// .pipe( conn.clean( [ '_a/**' ], 'www', { base: '.' } ) )
		// .pipe( conn.clean( '_a/**', 'yolo', { base: 'yolo' } ) )
		// .pipe( conn.clean( 'a/**', 'yolo', { base: 'a' } ) )
		// .pipe( conn.newerOrDifferentSize( 'a' ) )
		
		// .pipe( plumber() )
		
		.pipe( conn.newer( 'a' ) )
		.pipe( conn.dest( 'a' ) );
	*/
	
	/*return gulp.src( server.globs, { base: server.base, buffer: false } )
		.pipe( conn.newerOrDifferentSize( server.dest ) )
		.pipe( conn.dest( server.dest ) );*/
	
} );



// var path = require( 'path' );
gulp.task( 'ftp-clean', function () {
	
	// var conn = ftp.create( server.config );
	
	/*conn.delete( [
			'a/.htaccess'
		], function( a ) {
		console.log( '🦄', a );
	} );*/

	return conn.rmdir( 'a', function( e ) {
		console.log( '⚡️ SLP ⚡️', e );
	} );
	
	// var conn = ftp.create( server.config );
	
	// return conn.clean( globs, local, { base: '.' } );
	// return conn.clean( 'a/**', 'yolo', { base: 'a', buffer: false } );
	
	// return conn.clean( path.join( remoteRoot, '**'), localRoot, { base: remoteRoot } );
	/*var remoteRoot = 'a/';
	var localRoot = 'yolo';
	return conn.clean( path.join( remoteRoot, '**'), localRoot, { base: remoteRoot } );*/
	
} );