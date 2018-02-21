

STF.Main = ( function( window ) {


class Main {
	
	
	constructor() {
		
	}
	
	
	init() {
		STF.Config.init();
		STF.Props.init();
		STF.Device.init();
		STF.Path.init();
		STF.Lang.init();
		
		this._initDebug();
		
		
		STF.PagesController.init();
		STF.MainView.init();
		STF.Router.init();
		
		// this.$window.on( 'load', $.proxy( _windowLoad, this ) );
	}
	
	
	_initDebug() {
		this._initFPSStats( false );
		this._initMemoryStats( false );
		this._initDatGUI( false );
	}
	
	
	_initFPSStats( isSet ) {
		STF.Config.setFPSStats( isSet );
		
		if ( isSet && ( STF.Config.IS_DEV || STF.Config.IS_PREPROD_LOCAL ) )
			STF.Utils.FPSStats.init();
	}
	
	
	_initMemoryStats( isSet ) {
		STF.Config.setMemoryStats( isSet );
		
		if ( isSet && ( STF.Config.IS_DEV || STF.Config.IS_PREPROD_LOCAL ) )
			STF.Utils.MemoryStats.init();
	}
	
	
	_initDatGUI( isSet ) {
		if ( isSet && ( STF.Config.IS_DEV || STF.Config.IS_PREPROD_LOCAL ) )
			STF.Utils.DatGUI.init();
	}
	
	
}


return new Main();


} ) ( window );


$( STF.Main.init.bind( STF.Main ) );

