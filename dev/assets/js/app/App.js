'use strict';


var Config	= require( 'shared/configs/Config' );
var Props	= require( 'shared/configs/Props' );
var Device	= require( 'shared/configs/Device' );
var Path	= require( 'shared/configs/Path' );
var Lang	= require( 'shared/configs/Lang' );
// var Stats	= require( 'stats.min' );
// var DatGUI	= require( 'DatGUI' );
// var Scene	= require( 'Scene' );



function App() {
	
}


App.prototype.init = function() {
	/*var config = Config;
	config.init();
	console.log( config );
	
	var props = Props;
	props.init();
	console.log( props );
	
	var device = Device;
	device.init();
	console.log( device );
	
	var path = Path;
	path.init();
	console.log( path );
	
	var lang = Lang;
	lang.init();
	console.log( lang );*/
	
	Config.init();
	Props.init();
	Device.init();
	Path.init();
	// Lang.init();
	
	
	// STF.Config.init();
	// STF.Props.init();
	// STF.Device.init();
	// STF.Path.init();
	// STF.Lang.init();
};


module.exports = App;

