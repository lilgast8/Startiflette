

STF.Config = ( function( window ) {
	'use strict';
	
	
	function Config() {
		STF.EventDispatcher.call( this );
		
		this.ENV				= null;
		this.ENVS				= null;
		this.ROUTES_FILES		= null;
		this.ALL_LANG			= null;
		this.MULTIPLE_TRANS		= null;
		this.HAS_MOBILE_VERSION	= null;
		this.FORCE_DEVICE		= null;
		this.GA_ID				= null;
		this.CREDITS			= null;
		
		this.HAS_FPS_STATS		= null;
		this.HAS_MEMORY_STATS	= null;
	}
	
	
	Config.prototype				= Object.create( STF.EventDispatcher.prototype );
	Config.prototype.constructor	= Config;
	
	
	Config.prototype.init = function() {
		_setConfig.call( this );
		_showCreditsLog.call( this );
	};
	
	
	var _setConfig = function( data ) {
		for ( var varName in STF_Config )
			this[ varName ] = STF_Config[ varName ];
	};
	
	
	var _showCreditsLog = function() {
		console.log(
			'%cmade by %c— ' + this.CREDITS.author + ' —%c ' + this.CREDITS.authorUrl,
			'padding:8px 5px; color:' + this.CREDITS.color1 + '; line-height:25px;',
			'padding:8px 15px; color:' + this.CREDITS.color2 + '; background-color:' + this.CREDITS.color3 + '; line-height:25px;',
			'padding:8px 5px; color:' + this.CREDITS.color3 + '; line-height:25px;'
		);
	};
	
	
	Config.prototype.setFPSStats = function( isSet ) {
		this.HAS_FPS_STATS = isSet;
	};
	
	
	Config.prototype.setMemoryStats = function( isSet ) {
		this.HAS_MEMORY_STATS = isSet;
	};
	
	
	return new Config();
	
	
} ) ( window );

