'use strict';


var Config			= require( 'shared/configs/Config' );
var Props			= require( 'shared/configs/Props' );
var Device			= require( 'shared/configs/Device' );
var Path			= require( 'shared/configs/Path' );
var Lang			= require( 'shared/configs/Lang' );
var Router			= require( 'shared/routes/Router' );
var Debug			= require( 'shared/utils/Debug' );
// var MainView		= require( 'desktop/views/MainView' );
var PagesController	= require( 'desktop/controllers/PagesController' );
var MainView		= require( 'desktop/views/MainView' );
// var GlobalController	= require( 'desktop/controllers/GlobalController' );



function App() {
	
}


App.prototype.init = function() {
	Config.init();
	Props.init();
	Device.init();
	Path.init();
	Router.setUrl( null );
	Lang.init();
	Debug.init( false, false, false );
	// PagesController.init();
	// MainView.init();
	// STF.Router.init();
	
	PagesController.init();
	MainView.init();
	// GlobalController.init();
	
	// Router.bindEvents();
	Router.init();
	
	PagesController.initFirstPage();
};


module.exports = App;

