var options	= require( 'minimist' )( process.argv.slice(2) );
var paths	= require( '../utils/paths' );



options.task		= options._[0] === undefined ? 'default' : options._[0];
options.subtask		= null;
options.filePath	= null;

// options.flag		= options.prod : false;
// options.preprod			= options.preprod : false;
// options.preprod_local	= options.preprod_local : false;
setEnv();

options.imageMin	= true;

options.device		= null;

options.cssSrcPath	= null;
options.jsSrcPath	= null;
options.jsonSrcPath	= null;

options.deletePath	= null;
options.movePath	= null;



function setEnv() {
	if ( options.dev )
		options.env = 'dev';
	else if ( options.prod )
		options.env = 'prod';
	else if ( options.preprod )
		options.env = 'preprod';
	else if ( options.preprod_local )
		options.env = 'preprod_local';
	else
		options.env = 'preprod_local';
}



module.exports = options;