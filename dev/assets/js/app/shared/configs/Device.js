

STF.Device = ( function( window ) {
	'use strict';
	
	
	function Device() {
		this.FORCE_DEVICE		= null;
		
		this.DEVICE				= null;
		this.IS_DESKTOP			= null;
		this.IS_TABLET			= null;
		this.IS_MOBILE			= null;
		
		this.BROWSER			= null;
		this.BROWSER_VERSION	= null;
		this.IS_IE				= null;
	}
	
	
	Device.prototype.init = function() {
		_getConfig.call( this );
		_setDevice.call( this );
		_setBrowser.call( this );
	};
	
	
	var _getConfig = function() {
		this.FORCE_DEVICE = STF.Config.FORCE_DEVICE;
	};
	
	
	var _setDevice = function() {
		if ( this.FORCE_DEVICE )
			this.DEVICE = this.FORCE_DEVICE;
		else
			this.DEVICE = Detectizr.device.type;
		
		
		this.IS_DESKTOP	= this.DEVICE == 'desktop';
		this.IS_TABLET	= this.DEVICE == 'tablet';
		this.IS_MOBILE	= this.DEVICE == 'mobile';
	};
	
	
	var _setBrowser = function() {
		this.BROWSER			= Detectizr.browser.name;
		this.BROWSER_VERSION	= parseFloat( Detectizr.browser.major + '.' + Detectizr.browser.minor );
		this.IS_IE				= this.BROWSER == 'ie' ? true : false;
	};
	
	
	return new Device();
	
	
} ) ( window );

