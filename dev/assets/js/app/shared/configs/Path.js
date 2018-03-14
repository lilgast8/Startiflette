

STF.Configs.Path = new class Path {
	
	
	constructor() {
		this.URL = null;
	}
	
	
	init() {
		this._setPaths();
	}
	
	
	_setPaths() {
		const base		= STF.Configs.Config.ENVS.base_url;
		const baseCms	= STF.Configs.Config.ENVS.base_url_cms;
		
		// url paths
		this.URL = {
			base:		base,
			baseCms:	baseCms,
			assets:		base + 'assets/',
			_3d:		base + 'assets/3d/',
			css:		base + 'assets/css/',
			favicons:	base + 'assets/favicons/',
			files:		base + 'assets/files/',
			img:		base + 'assets/img/',
			js:			base + 'assets/js/',
			json:		base + 'assets/json/',
			sounds:		base + 'assets/sounds/',
			svg:		base + 'assets/svg/',
			videos:		base + 'assets/videos/',
			routes:		base + 'configs/routes/',
			server:		base + 'server/',
		};
	}
	
	
	overwriteSpecialPaths( assetsBaseUrl ) {
		if ( !assetsBaseUrl )
			return;
		
		
		const prevAssetsBaseUrl = this.URL.assets;
		
		for ( const key in this.URL )
			this.URL[ key ] = this.URL[ key ].replace( prevAssetsBaseUrl, assetsBaseUrl );
	}
	
	
}();

