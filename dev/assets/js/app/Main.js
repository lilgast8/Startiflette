

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
		
		if ( isSet && ( STF.Config.IS_DEV || STF.Config.IS_PREPROD_LOCAL ) )
			STF.Utils.FPSStats.init();
	};
	
	
	var _initMemoryStats = function( isSet ) {
		STF.Config.setMemoryStats( isSet );
		
		if ( isSet && ( STF.Config.IS_DEV || STF.Config.IS_PREPROD_LOCAL ) )
			STF.Utils.MemoryStats.init();
	};
	
	
	var _initDatGUI = function( isSet ) {
		if ( isSet && ( STF.Config.IS_DEV || STF.Config.IS_PREPROD_LOCAL ) )
			STF.Utils.DatGUI.init();
	};
	
	
	return new Main();
	
	
} ) ( window );


$( STF.Main.init.bind( STF.Main ) );

