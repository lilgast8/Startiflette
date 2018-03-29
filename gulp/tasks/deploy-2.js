var gulp	= require( 'gulp' );

var server	= require( '../utils/server' );

// var plumber	= require( 'gulp-plumber' );
// var gutil	= require( 'gulp-util' );
// var ftp		= require( 'vinyl-ftp' );
// var FTPS = require( 'ftps' );



gulp.task( 'deploy-new', function() {
	
	/*var ftps = new FTPS({
		host: 'domain.com', // required
		username: 'Test', // Optional. Use empty username for anonymous access.
		password: 'Test', // Required if username is not empty, except when requiresPassword: false
		protocol: 'sftp', // Optional, values : 'ftp', 'sftp', 'ftps', ... default: 'ftp'
		// protocol is added on beginning of host, ex : sftp://domain.com in this case
		port: 22, // Optional
		// port is added to the end of the host, ex: sftp://domain.com:22 in this case
		escape: true, // optional, used for escaping shell characters (space, $, etc.), default: true
		retries: 2, // Optional, defaults to 1 (1 = no retries, 0 = unlimited retries)
		timeout: 10, // Optional, Time before failing a connection attempt. Defaults to 10
		retryInterval: 5, // Optional, Time in seconds between attempts. Defaults to 5
		retryMultiplier: 1, // Optional, Multiplier by which retryInterval is multiplied each time new attempt fails. Defaults to 1
		requiresPassword: true, // Optional, defaults to true
		autoConfirm: true, // Optional, is used to auto confirm ssl questions on sftp or fish protocols, defaults to false
		cwd: '', // Optional, defaults to the directory from where the script is executed
		additionalLftpCommands: '', // Additional commands to pass to lftp, splitted by ';'
		requireSSHKey:  true, //  Optional, defaults to false, This option for SFTP Protocol with ssh key authentication
		sshKeyPath: '/home1/phrasee/id_dsa' // Required if requireSSHKey: true , defaults to empty string, This option for SFTP Protocol with ssh key authentication
	});*/
	
	var ftps = new FTPS( {
		host:					server.config.host, // required
		username:				server.config.user, // Optional. Use empty username for anonymous access.
		password:				server.config.password, // Required if username is not empty, except when requiresPassword: false
		protocol:				'ftp', // Optional, values : 'ftp', 'sftp', 'ftps', ... default: 'ftp'
		// protocol is added on beginning of host, ex : sftp://domain.com in this case
		port:					21, // Optional
		// port is added to the end of the host, ex: sftp://domain.com:22 in this case
		escape:					true, // optional, used for escaping shell characters (space, $, etc.), default: true
		retries:				2, // Optional, defaults to 1 (1 = no retries, 0 = unlimited retries)
		// timeout:				10, // Optional, Time before failing a connection attempt. Defaults to 10
		// retryInterval:			5, // Optional, Time in seconds between attempts. Defaults to 5
		// retryMultiplier:		1, // Optional, Multiplier by which retryInterval is multiplied each time new attempt fails. Defaults to 1
		// requiresPassword:		true, // Optional, defaults to true
		autoConfirm:			true, // Optional, is used to auto confirm ssl questions on sftp or fish protocols, defaults to false
		// cwd:					'yolo/', // Optional, defaults to the directory from where the script is executed
		// additionalLftpCommands:	'', // Additional commands to pass to lftp, splitted by ';'
		// requireSSHKey:			true, //  Optional, defaults to false, This option for SFTP Protocol with ssh key authentication
		// sshKeyPath:				'/home1/phrasee/id_dsa' // Required if requireSSHKey: true , defaults to empty string, This option for SFTP Protocol with ssh key authentication
	} );
	
	// Do some amazing things
	// ftps.cd( '' ).addFile( __dirname + '/test.txt' ).exec( console.log );
	
	// ftps.cd( '.' ).addFile( '/yolo' ).exec( console.log );
	// ftps.put( '.', 'oloy' ); // alias: addFile
	// ftps.rmdir( 'loyo/' ).exec( console.log );
	// ftps.rm( './**/*' ).exec( console.log );
	ftps.mirror( {
		remoteDir:	'loyo/', // optional, default: .
		localDir:	'yolo/', // optional: default: .
		// filter:		/\.pdf$/, // optional, filter the files synchronized
		// parallel:	10, // optional, default: false
		parallel:	1, // optional, default: false
		upload:		true, // optional, default: false, to upload the files from the locaDir to the remoteDir
	} ).exec( console.log );
	
} );