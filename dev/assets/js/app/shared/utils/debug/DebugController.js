

STF.Utils.Debug.DebugController = new class DebugController {
	
	
	constructor() {
		this.HAS_FPS_STATS		= false;
		this.HAS_MEMORY_STATS	= false;
		
		this.scripts = {
			fpsStats: {
				name: 'FPSStats',
				scripts: {
					library: {
						url:	'vendor/stats.js',
						loaded:	false
					},
					util: {
						url:	'app/shared/utils/debug/FPSStats.js',
						loaded:	false
					}
				}
			},
			memoryStats: {
				name: 'MemoryStats',
				scripts: {
					library: {
						url:	'vendor/memory-stats.js',
						loaded:	false
					},
					util: {
						url:	'app/shared/utils/debug/MemoryStats.js',
						loaded:	false
					}
				}
			},
			datGUI: {
				name: 'DatGUI',
				scripts: {
					library: {
						url:	'vendor/dat.gui.js',
						loaded:	false
					},
					util: {
						url:	'app/shared/utils/debug/DatGUI.js',
						loaded:	false
					}
				}
			}
		};
	}
	
	
	init( isFPSStatsSet, isMemoryStatsSet, isDatGUISet ) {
		this._loadFPSStatsScripts( isFPSStatsSet );
		this._loadMemoryStatsScripts( isMemoryStatsSet );
		this._loadDatGUIScripts( isDatGUISet );
	}
	
	
	_loadFPSStatsScripts( isSet ) {
		if ( isSet && ( STF.Configs.Config.IS_DEV || STF.Configs.Config.IS_PREPROD_LOCAL ) )
			this._addScript( this.scripts.fpsStats );
	}
	
	
	_loadMemoryStatsScripts( isSet ) {
		if ( isSet && ( STF.Configs.Config.IS_DEV || STF.Configs.Config.IS_PREPROD_LOCAL ) )
			this._addScript( this.scripts.memoryStats );
	}
	
	
	_loadDatGUIScripts( isSet ) {
		if ( isSet && ( STF.Configs.Config.IS_DEV || STF.Configs.Config.IS_PREPROD_LOCAL ) )
			this._addScript( this.scripts.datGUI );
	}
	
	
	_addScript( obj ) {
		const scripts = obj.scripts;
		
		for ( const type in scripts ) {
			const scriptType	= scripts[ type ];
			const script		= document.createElement( 'script' );
			
			script.onload = () => {
				scriptType.loaded = true;
				this._checkScriptsLoading( obj );
			};
			
			script.src = STF.Configs.Path.URL.js + scriptType.url;
			document.body.appendChild( script );
		}
	}
	
	
	_checkScriptsLoading( obj ) {
		if ( obj.name == 'FPSStats' && obj.scripts.library.loaded && obj.scripts.util.loaded )
			this._initFPSStats();
		else if ( obj.name == 'MemoryStats' && obj.scripts.library.loaded && obj.scripts.util.loaded )
			this._initMemoryStats();
		else if ( obj.name == 'DatGUI' && obj.scripts.library.loaded && obj.scripts.util.loaded )
			this._initDatGUI();
	}
	
	
	_initFPSStats() {
		this.fpsStats = STF.Utils.Debug.FPSStats;
		this.fpsStats.init();
		
		this.HAS_FPS_STATS = true;
	}
	
	
	_initMemoryStats() {
		this.memoryStats = STF.Utils.Debug.MemoryStats;
		this.memoryStats.init();
		
		this.HAS_MEMORY_STATS = true;
	}
	
	
	_initDatGUI() {
		this.datGUI = STF.Utils.Debug.DatGUI;
		this.datGUI.init();
	}
	
	
	rafStart() {
		if ( this.HAS_FPS_STATS && ( STF.Configs.Config.IS_DEV || STF.Configs.Config.IS_PREPROD_LOCAL ) )
			this.fpsStats.begin();
	}
	
	
	rafEnd() {
		if ( this.HAS_FPS_STATS && ( STF.Configs.Config.IS_DEV || STF.Configs.Config.IS_PREPROD_LOCAL ) )
			this.fpsStats.end();
		
		if ( this.HAS_MEMORY_STATS && ( STF.Configs.Config.IS_DEV || STF.Configs.Config.IS_PREPROD_LOCAL ) )
			this.memoryStats.update();
	}
	
	
}();

