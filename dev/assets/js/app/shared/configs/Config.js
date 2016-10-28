

STF.Config = ( function( window ) {
	'use strict';
	
	
	function Config() {
		this.ENV				= null;
		this.ENVS				= null;
		this.ALL_LANG			= null;
		this.FORCE_DEVICE		= null;
		this.GA_ID				= null;
		this.CREDITS			= null;
		
		this.IS_DEV				= null;
		this.IS_PREPROD_LOCAL	= null;
		this.IS_PREPROD			= null;
		this.IS_PROD			= null;
		this.NEED_PAGE_ID		= null;
		
		this.JS_VIEWS_ID		= null;
		
		this.HAS_FPS_STATS		= null;
		this.HAS_MEMORY_STATS	= null;
	}
	
	
	Config.prototype.init = function() {
		_setConfig.call( this );
		_setJsViewsId.call( this );
		_showCreditsLog.call( this );
	};
	
	
	var _setConfig = function() {
		for ( var varName in STF_Config )
			this[ varName ] = STF_Config[ varName ];
	};
	
	
	var _setJsViewsId = function() {
		this.JS_VIEWS_ID = STF_JS_VIEWS_ID;
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

