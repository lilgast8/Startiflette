

APP.Path = ( function( window ) {
	
	
	function Path() {
		this.URL		= null;
	}
	
	
	Path.prototype.init = function() {
		_setPaths.call( this );
	};
	
	
	var _setPaths = function() {
		var baseUrl = APP.Config.ENVS[ APP.Config.ENV ].base_url;
		
		// url paths
		this.URL = {
			base:	baseUrl,
			assets:	baseUrl + 'assets/',
			css:	baseUrl + 'assets/css/',
			img:	baseUrl + 'assets/img/',
			js:		baseUrl + 'assets/js/',
			json:	baseUrl + 'assets/json/',
			routes:	baseUrl + 'assets/json/routes/',
			server:	baseUrl + 'server/',
		};
	};
	
	
	return new Path();
	
	
} ) (window);

