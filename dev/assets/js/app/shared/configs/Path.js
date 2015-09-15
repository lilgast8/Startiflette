

APP.Path = ( function( window ) {
	
	
	function Path() {
		this.URL		= null;
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
	};
	
	
	return new Path();
	
	
} ) (window);

