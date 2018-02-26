

STF.Configs.Path = new class Path {
	
	
	constructor() {
		this.URL = null;
	}
	
	
	init() {
		this._setPaths();
	}
	
	
	_setPaths() {
		const baseUrl = STF.Configs.Config.ENVS.base_url;
		
		// url paths
		this.URL = {
			base:		baseUrl,
			assets:		baseUrl + 'assets/',
			_3d:		baseUrl + 'assets/3d/',
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
	}
	
	
	overwriteSpecialPaths( assetsBaseUrl ) {
		if ( !assetsBaseUrl )
			return;
		
		
		for ( const key in this.URL )
			this.URL[ key ] = this.URL[ key ].replace( 'assets/', assetsBaseUrl );
	}
	
	
}();

