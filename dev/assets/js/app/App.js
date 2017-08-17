'use strict';


var Config			= require( 'shared/configs/Config' );
var Props			= require( 'shared/configs/Props' );
var Device			= require( 'shared/configs/Device' );
var Path			= require( 'shared/configs/Path' );
var Lang			= require( 'shared/configs/Lang' );
var Debug			= require( 'shared/utils/Debug' );
var MainView		= require( 'desktop/views/MainView' );
var PagesController	= require( 'desktop/controllers/PagesController' );




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
	Lang.init();
	Debug.init( false, false, false );
	PagesController.init();
	MainView.init();
	// STF.Router.init();
};


module.exports = App;

