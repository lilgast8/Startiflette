var options	= require( 'minimist' )( process.argv.slice(2) );
var paths	= require( '../utils/paths' );



var tasks = {
	init : false,
	prod : false
}

if ( options._[0] == 'prod' )
	tasks.prod = true;
else if ( options._[0] == 'init' )
	tasks.init = true;



options.imageMin	= true;

options.device		= null;

options.cssSrcPath	= null;
options.jsSrcPath	= null;
options.jsonSrcPath	= null;

options.deletePath	= null;


if ( tasks.init )
	options.deletePath = paths.emptyFiles;

else if ( tasks.prod )
	options.deletePath = [
		paths.assets.jsonJsFilesFile,
		paths.assets.jsFiles,
		'!' + paths.assets.jsHTML5Shiv,
		paths.assets.json,
		paths.assets.img
	];



module.exports	= options;