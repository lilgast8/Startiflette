var options	= require( 'minimist' )( process.argv.slice(2) );
var paths	= require( '../utils/paths' );



options.task		= options._[0] === undefined ? 'default' : options._[0];
console.log('TASK:', options.task);
options.subtask		= null;
options.filePath	= null;

options.imageMin	= true;

options.device		= null;

options.cssSrcPath	= null;
options.jsSrcPath	= null;
options.jsonSrcPath	= null;

options.deletePath	= null;



module.exports	= options;