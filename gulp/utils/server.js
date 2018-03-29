var paths	= require( '../utils/paths' );

var gutil	= require( 'gulp-util' );



module.exports = {
	
	config: {
		host:		'host',
		user:		'user',
		password:	'password',
		parallel:	10,
		log:		gutil.log
	},
	
	globs: [
		paths.env.prod + '.htaccess',
		paths.env.prod + '**'
	],
	
	base: paths.env.prod,
	dest: 'dest_dir/'
	
};