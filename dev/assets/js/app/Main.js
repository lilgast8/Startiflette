

STF.Main = ( function( window ) {
	'use strict';
	
	
	function Main() {
		
	}
	
	
	Main.prototype.init = function() {
		STF.Config.init();
		STF.Props.init();
		STF.Device.init();
		STF.Path.init();
		STF.Lang.init();
		
		// _loadRoutes.call( this );
		
		_initDebug.call( this );
		
		STF.PagesController.init();
		STF.MainView.init();
		STF.Router.init();
		
		// this.$window.on( 'load', $.proxy( _windowLoad, this ) );
	};
	
	
	var _initDebug = function() {
		_initFPSStats.call( this, false );
		_initMemoryStats.call( this, false );
		_initDatGUI.call( this, false );
	};
	
	
	var _initFPSStats = function( isSet ) {
		STF.Config.setFPSStats( isSet );
		
		if ( isSet && STF.Config.ENV != 'preprod' && STF.Config.ENV != 'prod' ) // FPS stats
			STF.Utils.FPSStats.init();
	};
	
	
	var _initMemoryStats = function( isSet ) {
		STF.Config.setMemoryStats( isSet );
		
		if ( isSet && STF.Config.ENV != 'preprod' && STF.Config.ENV != 'prod' ) // memory stats
			STF.Utils.MemoryStats.init();
	};
	
	
	var _initDatGUI = function( isSet ) {
		if ( isSet && STF.Config.ENV != 'preprod' && STF.Config.ENV != 'prod' ) // datGUI
			STF.Utils.DatGUI.init();
	};
	
	
	/*var _loadRoutes = function() {
		// STF.Router.buildEvt( STF.Router.E.INIT, _routesLoaded.bind( this ) );
		// STF.Router.init();
	};
	
	
	var _routesLoaded = function() {
		/* Debug *
		// if ( STF.Config.ENV != 'preprod' && STF.Config.ENV != 'prod' ) // FPS stats
		// 	STF.Utils.FPSStats.init();
		
		// if ( STF.Config.ENV != 'preprod' && STF.Config.ENV != 'prod' ) // memory stats
		// 	STF.Utils.MemoryStats.init();
		
		// if ( STF.Config.ENV != 'preprod' && STF.Config.ENV != 'prod' ) // datGUI
		// 	STF.Utils.DatGUI.init();
		
		
		STF.MainView.init();
		
		STF.PagesController.init();
		STF.Router.initRouting();
	};*/
	
	
	return new Main();
	
	
} ) ( window );


$( STF.Main.init.bind( STF.Main ) );

