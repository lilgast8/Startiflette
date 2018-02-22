

STF.Views.Statics.MainLoader = new class MainLoader extends STF.Abstracts.AbstractMainLoader {
	
	
	constructor() {
		super();
	}
	
	
	/*init() {
		super.init();
	}*/
	
	
	initDOM() {
		this.$loader = $( document.getElementById( 'main-loader' ) );
	}
	
	
	initTl() {
		
	}
	
	
	onProgress( percentage ) {
		console.log( percentage );
	}
	
	
	hideInit() {
		this.$loader[0].style.display = 'none';
		this.dispatch( this.E.HIDDEN );
	}
	
	
	show() {
		this.$loader[0].style.display = 'block';
		this.$loader[0].offsetHeight; // jshint ignore:line
		
		this._onShowComplete();
	}
	
	
	hide() {
		this._onHideComplete();
	}
	
	
	_onHideInitComplete() {
		this.killTimeline( 'hideInit' );
		
		STF_dom_removeClass( this.$loader[0], 'init' );
		this.$loader[0].style.display = 'none';
		
		this.dispatch( this.E.HIDDEN );
	}
	
	
	_onShowComplete() {
		this.dispatch( this.E.SHOWN );
	}
	
	
	_onHideComplete() {
		// LOADING_MODE == 'byPageStatic' && LOADING_MODE == 'byPageDynamic'
		this.$loader[0].style.display = 'none';
		
		this.dispatch( this.E.HIDDEN );
	}
	
	
}();

