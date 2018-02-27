

STF.Configs.Config = new class Config {
	
	
	constructor() {
		this.ENV				= null;
		this.ENVS				= null;
		this.ALL_LANG			= null;
		this.FORCE_DEVICE		= null;
		this.GA_ID				= null;
		this.CREDITS			= null;
		
		this.IS_DEV				= null;
		this.IS_PREPROD_LOCAL	= null;
		this.IS_PREPROD			= null;
		this.IS_PROD			= null;
		this.NEED_PAGE_ID		= null;
		
		this.JS_VIEWS_ID		= null;
	}
	
	
	init () {
		this._setConfig();
		this._setJsViewsId();
		this._showCreditsLog();
	}
	
	
	_setConfig() {
		for ( const varName in STF_Config )
			this[ varName ] = STF_Config[ varName ];
	}
	
	
	_setJsViewsId() {
		this.JS_VIEWS_ID = STF_JS_VIEWS_ID;
	}
	
	
	_showCreditsLog() {
		console.log(
			`%cmade by %c— ${ this.CREDITS.author } —%c ${ this.CREDITS.authorUrl }`,
			`padding: 8px 5px; color: ${ this.CREDITS.color1 }; line-height:25px;`,
			`padding: 8px 15px; color: ${ this.CREDITS.color2 }; background-color: ${ this.CREDITS.color3 }; line-height:25px;`,
			`padding: 8px 5px; color: ${ this.CREDITS.color3 }; line-height:25px;`
		);
	}
	
	
}();

