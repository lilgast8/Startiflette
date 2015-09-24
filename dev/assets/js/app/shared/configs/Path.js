

STF.Path = ( function( window ) {
	'use strict';
	
	
	function Path() {
		this.URL		= null;
	}
	
	
	Path.prototype.init = function() {
		_setPaths.call( this );
	};
	
	
	var _setPaths = function() {
		var baseUrl = STF.Config.ENVS[ STF.Config.ENV ].base_url;
		
		// url paths
		this.URL = {
			base:	baseUrl,
			assets:	baseUrl + 'assets/',
			css:	baseUrl + 'assets/css/',
			img:	baseUrl + 'assets/img/',
			js:		baseUrl + 'assets/js/',
			json:	baseUrl + 'assets/json/',
			svg:	baseUrl + 'assets/svg/',
			routes:	baseUrl + 'configs/routes/',
			server:	baseUrl + 'server/',
		};
	};
	
	
	return new Path();
	
	
} ) (window);

