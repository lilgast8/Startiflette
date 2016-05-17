

STF.Config = ( function( window ) {
	'use strict';
	
	
	function Config() {
		STF.EventDispatcher.call( this );
		
		this.E = {
			INIT: 'init'
		};
		
		this.CONFIG_FILE_PATH	= BASE_URL + 'configs/config/config.json';
		
		this.ENV				= null;
		this.ENVS				= null;
		this.ROUTES_FILES		= null;
		this.ALL_LANG			= null;
		this.HAS_LANG_LANDING	= null;
		this.HAS_MOBILE_VERSION	= null;
		this.FORCE_DEVICE		= null;
		this.GA_ID				= null;
		this.CREDITS			= null;
		
		this.HAS_PUSHSTATE		= null;
		this.TRANSFORM			= null;
		this.HAS_TRANSFORMS		= null;
		this.HAS_TRANSFORMS_3D	= null;
		this.HAS_TRANSITIONS	= null;
		this.HAS_ANIMATIONS		= null;
		
		this.aJsonFiles			= [
			{
				id:		'config',
				src:	this.CONFIG_FILE_PATH
			}
		];
	}
	
	
	Config.prototype				= Object.create( STF.EventDispatcher.prototype );
	Config.prototype.constructor	= Config;
	
	
	Config.prototype.init = function() {
		_loadConfigFile.call(this);
	};
	
	
	var _loadConfigFile = function() {
		this.jsonLoader = new STF.Loader( false, false );
		
		this.jsonLoader.buildEvt( this.jsonLoader.E.COMPLETE, _onComplete.bind( this ) );
		
		this.jsonLoader.startLoad( this.aJsonFiles );
	};
	
	
	var _onComplete = function( data ) {
		_destroyJsonLoader.call( this );
		
		_setConfig.call( this, data );
		_setProperties.call( this );
		_showCreditsLog.call( this );
		
		this.dispatch( this.E.INIT );
	};
	
	
	var _destroyJsonLoader = function() {
		this.jsonLoader.destroyEvt( this.jsonLoader.E.COMPLETE, _onComplete.bind( this ) );
		
		this.jsonLoader.destroy();
		this.jsonLoader = null;
	};
	
	
	var _setConfig = function( data ) {
		var config = data.config;
		
		for ( var varName in config )
			this[ varName ] = config[ varName ];
	};
	
	
	var _setProperties = function() {
		this.HAS_PUSHSTATE		= Modernizr.history;
		this.TRANSFORM			= Modernizr.prefixed( 'transform' );
		this.HAS_TRANSFORMS		= Modernizr.csstransforms;
		this.HAS_TRANSFORMS_3D	= Modernizr.csstransforms3d;
		this.HAS_TRANSITIONS	= Modernizr.csstransitions;
		this.HAS_ANIMATIONS		= Modernizr.cssanimations;
	};
	
	
	var _showCreditsLog = function() {
		console.log(
			'%cmade by %c— ' + this.CREDITS.author + ' —%c ' + this.CREDITS.authorUrl,
			'padding:8px 5px; color:' + this.CREDITS.color1 + '; line-height:25px;',
			'padding:8px 15px; color:' + this.CREDITS.color2 + '; background-color:' + this.CREDITS.color3 + '; line-height:25px;',
			'padding:8px 5px; color:' + this.CREDITS.color3 + '; line-height:25px;'
		);
	};
	
	
	return new Config();
	
	
} ) ( window );

