var options = require('minimist')(process.argv.slice(2));

var defaults = {
	minify : false
}


if(options._[0] == 'prod') {
	defaults.minify = true
}


options.minify = options.minify === undefined ? defaults.minify : options.minify;
options.device = null;


module.exports = options;