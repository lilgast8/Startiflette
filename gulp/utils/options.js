var options = require('minimist')(process.argv.slice(2));



// var defaults = {
// 	minify : false
// }

// if(options._[0] == 'prod')
// 	defaults.minify = true



// options.minify = options.minify === undefined ? defaults.minify : options.minify;
options.device		= null;

options.cssSrcPath	= null;
options.jsSrcPath	= null;
options.jsonSrcPath	= null;

options.assetsPath	= null;

options.cleanPath	= null;


module.exports		= options;