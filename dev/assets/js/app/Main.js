

STF.Main = ( function( window ) {
	
	
	function Main() {
		this.v = {};
		this.o = {};
	}
	
	
	Main.prototype.init = function() {
		STF.Config.buildEvt( STF.Config.E.INIT, _configLoaded.bind( this ) );
		STF.Config.init();
		
		// this.$window.on( 'load', $.proxy( _windowLoad, this ) );
	};
	
	
	var _configLoaded = function() {
		STF.Path.init();
		STF.Lang.init();
		
		_loadRoutes.call( this );
	};
	
	
	var _loadRoutes = function() {
		STF.Router.buildEvt( STF.Router.E.INIT, _routesLoaded.bind( this ) );
		STF.Router.init();
	};
	
	
	var _routesLoaded = function() {
		STF.MainView.init();
		
		STF.OldBrowser.init();
		
		
		/* Debug */
		// if ( STF.Config.ENV == 'dev' || STF.Config.ENV == 'preprod_local' ) // FPS stats
		// 	STF.Utils.FPSStats.init();
		
		// if ( STF.Config.ENV == 'dev' || STF.Config.ENV == 'preprod_local' ) // memory stats
		// 	STF.Utils.MemoryStats.init();
		
		// if ( STF.Config.ENV == 'dev' || STF.Config.ENV == 'preprod_local' ) // datGUI
		// 	STF.Utils.DatGUI.init();
		
		
		STF.Router.initRouting();
	};
	
	
	return new Main();
	
	
} ) ( window );


$( STF.Main.init.bind( STF.Main ) );

