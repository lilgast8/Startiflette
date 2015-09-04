

APP.Path = ( function( window ) {
	
	
	function Path() {
		this.URL		= null;
		// this.FILE		= null;
		this.PAGE_URL	= null;
		// this.LINK		= null;
		
		// this.deviceDir	= null;
		
		this.PAGE_URL = {
			full:		null,
			params:		null,
			aParams:	null,
			current:	null,
			aCurrent:	null
		};
	}
	
	
	Path.prototype.init = function() {
		// _setDeviceDir.call( this );
		_setPaths.call( this );
	};
	
	
	// var _setDeviceDir = function() {
	// 	if ( APP.Config.HAS_MOBILE_VERSION )
	// 		this.deviceDir = 'desktop/';
	// 	else if ( APP.Config.HAS_MOBILE_VERSION && ( APP.Config.DEVICE == 'desktop' || APP.Config.DEVICE == 'tablet' ) )
	// 		this.deviceDir = 'desktop/';
	// 	else if ( APP.Config.HAS_MOBILE_VERSION && APP.Config.DEVICE == 'mobile' )
	// 		this.deviceDir = 'mobile/';
	// };
	
	
	var _setPaths = function() {
		// url paths
		this.URL = {
			base:	APP.Config.BASE_URL_DEV,
			assets:	APP.Config.BASE_URL_DEV + 'assets/',
			css:	APP.Config.BASE_URL_DEV + 'assets/css/',
			img:	APP.Config.BASE_URL_DEV + 'assets/img/',
			js:		APP.Config.BASE_URL_DEV + 'assets/js/',
			json:	APP.Config.BASE_URL_DEV + 'json/',
			routes:	APP.Config.BASE_URL_DEV + 'assets/routes/',
			server:	APP.Config.BASE_URL_DEV + 'server/',
		};
		
		
		// file paths
		/*
		this.FILE = {
			assets:			'assets/',
			css:			'assets/css/',
			img:			'assets/img/',
			js:				'assets/js/',
			json:			'assets/json/',
			jsFilesFile:	'assets/json/config/js-files.json',
			routes:			'assets/json/routes/',
			server:			'server/',
			shared:			'server/shared/',
			views:			'server/views/',
			viewsPage:		'server/views' + this.deviceDir + 'pages/',
			viewsPartials:	'server/views' + this.deviceDir + 'partials/',
			viewsAlt:		'server/views/alt/'
		};
		*/
		
		
		// page url paths
		this.PAGE_URL.full		= History.getState().url;
		this.PAGE_URL.params	= _getParamsPageUrl.call( this );
		this.PAGE_URL.aParams	= this.PAGE_URL.params.split( '/' );
	};
	
	
	Path.prototype.setCurrentPageUrl = function() {
		// this.PAGE_URL.current	= this.getCurrentPageUrl();
		// this.PAGE_URL.aCurrent	= explode( '/', self::$PAGE_URL->current );
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
		// $currentPageUrl = preg_replace( '/' . Lang::$LANG . '/', '', self::$PAGE_URL->params, 1 );
		
		// if ( substr( $currentPageUrl, 0, 1 ) == '/' ) // if / is first character, remove it
		// 	$currentPageUrl = substr( $currentPageUrl, 1 );
		
		
		// return $currentPageUrl;
	};
	
	
	return new Path();
	
	
} ) (window);

