

STF.Lang = ( function( window ) {
	
	
	function Lang() {
		
	}
	
	
	Lang.prototype.init = function() {
		_setGlobalInfos.call( this );
		STF.Router.setPageUrl( true, null );
		_setCurrentLang.call( this );
		STF.Router.setCurrentPageUrl();
		_setLangLinks.call( this );
	};
	
	
	var _setGlobalInfos = function() {
		// all lang
		this.ALL_LANG = STF.Config.ALL_LANG;
		
		// default lang
		this.DEFAULT_LANG = this.ALL_LANG[0];
		
		// multi-lang
		if ( this.ALL_LANG.length == 1 )
			this.MULTI_LANG = false;
		else
			this.MULTI_LANG = true;
	};
	
	
	var _setCurrentLang = function() {
		if ( !this.MULTI_LANG || STF.Router.PAGE_URL.params.length === 0 )
			this.LANG = this.DEFAULT_LANG;
		else
			this.LANG = STF.Router.PAGE_URL.aParams[0];
	};
	
	
	var _setLangLinks = function() {
		this.LANG_LINK_ROOT	= this.LANG == this.DEFAULT_LANG ? '' : this.LANG;
		this.LANG_LINK		= this.MULTI_LANG ? this.LANG + '/' : '';
	};
	
	
	return new Lang();
	
	
} ) (window);

