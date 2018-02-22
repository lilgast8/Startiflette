

STF.Utils.Debug.DebugController = new class DebugController {
	
	
	constructor( isFPSStatsSet, isMemoryStatsSet, isDatGUISet ) {
		
	}
	
	
	init( isFPSStatsSet, isMemoryStatsSet, isDatGUISet ) {
		this._initFPSStats( isFPSStatsSet );
		this._initMemoryStats( isMemoryStatsSet );
		this._initDatGUI( isDatGUISet );
	}
	
	
	_initFPSStats( isSet ) {
		STF.Configs.Config.setFPSStats( isSet );
		
		if ( isSet && ( STF.Configs.Config.IS_DEV || STF.Configs.Config.IS_PREPROD_LOCAL ) )
			STF.Utils.Debug.FPSStats.init();
	}
	
	
	_initMemoryStats( isSet ) {
		STF.Configs.Config.setMemoryStats( isSet );
		
		if ( isSet && ( STF.Configs.Config.IS_DEV || STF.Configs.Config.IS_PREPROD_LOCAL ) )
			STF.Utils.Debug.MemoryStats.init();
	}
	
	
	_initDatGUI( isSet ) {
		if ( isSet && ( STF.Configs.Config.IS_DEV || STF.Configs.Config.IS_PREPROD_LOCAL ) )
			STF.Utils.Debug.DatGUI.init();
	}
	
	
}();

