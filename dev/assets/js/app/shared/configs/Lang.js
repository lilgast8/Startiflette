

STF.Configs.Lang = new class Lang {
	
	
	constructor() {
		
	}
	
	
	init() {
		this._setGlobalInfos();
		STF.Core.Router.setUrl( true, null );
		this._setCurrentLang();
		this._checkDefaultLang();
		this._setLangLinks();
	}
	
	
	_setGlobalInfos() {
		// all lang
		this.ALL_LANG = STF.Configs.Config.ALL_LANG;
		
		// default lang
		this.DEFAULT_LANG = this.ALL_LANG[0];
		
		// multi-lang
		if ( this.ALL_LANG.length == 1 )
			this.MULTI_LANG = false;
		else
			this.MULTI_LANG = true;
	}
	
	
	_setCurrentLang() {
		if ( !this.MULTI_LANG || STF.Core.Router.URL.path.length === 0 )
			this.LANG = this.DEFAULT_LANG;
		else
			this.LANG = STF.Core.Router.URL.pathParams[0];
	}
	
	
	_checkDefaultLang() {
		if ( this.ALL_LANG.indexOf( this.LANG ) < 0 )
			this.LANG = this.DEFAULT_LANG;
	}
	
	
	_setLangLinks() {
		this.LANG_LINK_ROOT	= this.LANG == this.DEFAULT_LANG ? '' : this.LANG;
		this.LANG_LINK		= this.MULTI_LANG ? this.LANG + '/' : '';
	}
	
	
}();

