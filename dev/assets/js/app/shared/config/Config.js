

APP.Config = ( function( window ) {
	
	
	function Config() {
		this.CONFIG_FILE_PATH	= 'assets/json/config/config.json';
		
		this.aJsonFiles			= [
			{
				id:		'config',
				src:	this.CONFIG_FILE_PATH
			}
		];
	}
	
	
	Config.prototype.init = function() {
		_loadConfigFile.call(this);
	};
	
	
	var _loadConfigFile = function() {
		this.jsonLoader = new APP.Loader( false );
		
		this.jsonLoader.buildEvt( this.jsonLoader.E.COMPLETE, _onComplete.bind( this ) );
		
		this.jsonLoader.startLoad( this.aJsonFiles );
	};
	
	
	var _onComplete = function( data ) {
		_setConfig.call( this, data );
		_setDevice.call( this );
		_setBrowser.call( this );
		_setMethods.call( this );
		
		// APP.OldBrowser.init();
	};
	
	
	var _setConfig = function( data ) {
		var config = data.config;
		
		for ( var varName in config )
			this[ varName ] = config[ varName ];
	};
	
	
	var _setDevice = function() {
		if ( this.FORCE_DEVICE )
			this.DEVICE = this.FORCE_DEVICE;
		else
			this.DEVICE = Detectizr.device.type;
	};
	
	
	var _setBrowser = function() {
		this.BROWSER			= Detectizr.browser.name;
		this.BROWSER_VERSION	= parseFloat( Detectizr.browser.major + '.' + Detectizr.browser.minor );
		this.DEVICE				= Detectizr.device.type;
		this.IS_IE				= APP.Config.BROWSER == 'ie' ? true : false;
	};
	
	
	var _setMethods = function() {
		this.HAS_PUSHSTATE	= Modernizr.history;
		this.TRANSFORM		= getSupportedPropertyName( 'transform' );
	};
	
	
	return new Config();
	
	
} ) (window);

