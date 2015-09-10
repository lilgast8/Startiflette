

APP.Path = ( function( window ) {
	
	
	function Path() {
		this.URL		= null;
		this.PAGE_URL	= null;
		
		this.PAGE_URL = {
			full:		null,
			params:		null,
			aParams:	null,
			current:	null,
			aCurrent:	null
		};
	}
	
	
	Path.prototype.init = function() {
		_setPaths.call( this );
	};
	
	
	var _setPaths = function() {
		// url paths
		this.URL = {
			base:	APP.Config.BASE_URL_DEV,
			assets:	APP.Config.BASE_URL_DEV + 'assets/',
			css:	APP.Config.BASE_URL_DEV + 'assets/css/',
			img:	APP.Config.BASE_URL_DEV + 'assets/img/',
			js:		APP.Config.BASE_URL_DEV + 'assets/js/',
			json:	APP.Config.BASE_URL_DEV + 'assets/json/',
			routes:	APP.Config.BASE_URL_DEV + 'assets/json/routes/',
			server:	APP.Config.BASE_URL_DEV + 'server/',
		};
		
		
		// page url paths
		this.PAGE_URL.full		= History.getState().url;
		this.PAGE_URL.params	= _getParamsPageUrl.call( this );
		this.PAGE_URL.aParams	= this.PAGE_URL.params.split( '/' );
	};
	
	
	Path.prototype.setCurrentPageUrl = function() {
		this.PAGE_URL.current	= _getCurrentPageUrl.call( this );
		this.PAGE_URL.aCurrent	= this.PAGE_URL.current.split( '/' );
	};
	
	
	var _getParamsPageUrl = function() {
		var paramsPageUrl = this.PAGE_URL.full.replace( this.URL.base, '' );
		
		if ( paramsPageUrl.substr( 0, 1 ) == '/' ) // if / is first character, remove it
			paramsPageUrl = paramsPageUrl.substr( 1 );
		
		if ( paramsPageUrl.substr( paramsPageUrl.length-1, 1 ) == '/' ) // if / is last character, remove it
			paramsPageUrl = paramsPageUrl.substr( 0, paramsPageUrl.length-1 );
		
		paramsPageUrl = paramsPageUrl.split( '?' )[0]; // remove ?params
		
		
		return paramsPageUrl;
	};
	
	
	var _getCurrentPageUrl = function()
	{
		var currentPageUrl = this.PAGE_URL.params.replace( APP.Lang.LANG, '' );
		
		if ( currentPageUrl.substr( 0, 1 ) == '/' ) // if / is first character, remove it
			currentPageUrl = currentPageUrl.substr( 1 );
		
		
		return currentPageUrl;
	};
	
	
	return new Path();
	
	
} ) (window);

