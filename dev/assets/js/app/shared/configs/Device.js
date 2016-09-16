

STF.Device = ( function( window ) {
	'use strict';
	
	
	function Device() {
		this.HAS_MOBILE_VERSION	= null;
		this.TABLET_VERSION		= null;
		this.FORCE_DEVICE		= null;
		
		this.DEVICE				= null;
		this.IS_DESKTOP			= null;
		this.IS_TABLET			= null;
		this.IS_MOBILE			= null;
		this.BROWSER			= null;
		this.BROWSER_VERSION	= null;
		this.BROWSER_ENGINE		= null;
		this.IS_OLD_BROWSER		= null;
		this.IS_IE				= null;
		this.IS_EDGE			= null;
	}
	
	
	Device.prototype.init = function() {
		_setDevice.call( this );
	};
	
	var _setDevice = function() {
		for ( var varName in STF_Device )
			this[ varName ] = STF_Device[ varName ];
	};
	
	
	return new Device();
	
	
} ) ( window );

