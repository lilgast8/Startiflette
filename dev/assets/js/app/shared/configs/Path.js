

STF.Path = ( function( window ) {
	'use strict';
	
	
	function Path() {
		this.URL = null;
	}
	
	
	Path.prototype.init = function() {
		_setPaths.call( this );
	};
	
	
	var _setPaths = function() {
		var baseUrl = STF.Config.ENVS.base_url;
		
		// url paths
		this.URL = {
			base:		baseUrl,
			assets:		baseUrl + 'assets/',
			css:		baseUrl + 'assets/css/',
			favicons:	baseUrl + 'assets/favicons/',
			files:		baseUrl + 'assets/files/',
			img:		baseUrl + 'assets/img/',
			js:			baseUrl + 'assets/js/',
			json:		baseUrl + 'assets/json/',
			sounds:		baseUrl + 'assets/sounds/',
			svg:		baseUrl + 'assets/svg/',
			videos:		baseUrl + 'assets/videos/',
			routes:		baseUrl + 'configs/routes/',
			server:		baseUrl + 'server/',
		};
	};
	
	
	return new Path();
	
	
} ) (window);

