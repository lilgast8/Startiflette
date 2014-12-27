var options	= require( 'minimist' )( process.argv.slice(2) );
var paths	= require( '../utils/paths' );



var defaults = {
	// minify : false
	init : false,
	prod : false
}

if ( options._[0] == 'prod' )
	// defaults.minify = true
	defaults.prod = true;
else if ( options._[0] == 'init' )
	defaults.init = true;



// options.minify = options.minify === undefined ? defaults.minify : options.minify;
options.device		= null;

options.cssSrcPath	= null;
options.jsSrcPath	= null;
options.jsonSrcPath	= null;

options.assetsPath	= null;

options.cleanPath	= null;
if ( defaults.init )
	options.cleanPath = paths.emptyFiles;
else if ( defaults.prod )
	options.cleanPath = [
		paths.assets.jsFiles,
		'!' + paths.assets.jsHTML5Shiv,
		paths.assets.json,
		paths.assets.img
	];



module.exports		= options;