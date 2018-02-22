

STF.Views			= STF.Views || {};
STF.Views.Statics	= STF.Views.Statics || {};


STF.Views.Statics.MainLoader = ( function( window ) {


class MainLoader extends STF.AbstractMainLoader {
	
	
	constructor() {
		super();
	}
	
	
	/*init() {
		super.init();
	}*/
	
	
	initDOM() {
		this.$loader		= $( document.getElementById( 'main-loader' ) );
		this.$loaderCont	= this.$loader.find( '.main-loader-container' );
		this.$percentage	= this.$loader.find( '.main-loader-percentage' );
		this.$progress		= this.$loader.find( '.main-loader-progress' );
		this.$loading		= this.$loader.find( '.main-loader-loading' );
	}
	
	
	initTl() {
		/* Hide init */
		this.tl.hideInit = new TimelineLite( {
			paused:			true,
			onComplete:		this._onHideInitComplete,
			callbackScope:	this
		} );
		
		this.tl.hideInit.to( this.$loader, 1.5, { xPercent:100, ease:Quart.easeInOut }, 0 );
		this.tl.hideInit.to( this.$loaderCont, 1.5, { xPercent:-100, ease:Quart.easeInOut }, 0 );
		
		
		/* Show */
		this.tl.show = new TimelineLite( {
			paused:			true,
			onComplete:		this._onShowComplete,
			callbackScope:	this
		} );
		
		this.tl.show.set( this.$loader, { xPercent:-100 }, 0 );
		this.tl.show.set( this.$loaderCont, { xPercent:100 }, 0 );
		this.tl.show.to( this.$loader, 1, { xPercent:0, ease:Quart.easeInOut }, 0 );
		this.tl.show.to( this.$loaderCont, 1, { xPercent:0, ease:Quart.easeInOut }, 0 );
		
		
		/* Hide */
		this.tl.hide = new TimelineLite( {
			paused:			true,
			onComplete:		this._onHideComplete,
			callbackScope:	this
		} );
		
		this.tl.hide.to( this.$loader, 1, { xPercent:100, ease:Quart.easeInOut }, 0 );
		this.tl.hide.to( this.$loaderCont, 1, { xPercent:-100, ease:Quart.easeInOut }, 0 );
	}
	
	
	onProgress( percentage ) {
		const posX = percentage - 100;
		
		this.$percentage[0].innerHTML					= parseInt( percentage ) + ' %';
		this.$progress[0].style[ STF.Props.TRANSFORM ]	= 'translate(' + posX + '%, 0%)';
	}
	
	
	hideInit() {
		this.tl.hideInit.play();
		
		
		// this.$loader[0].style.display = 'none';
		// this.dispatch( this.E.HIDDEN );
	}
	
	
	show() {
		this.$loader[0].style.display = 'block';
		this.$loader[0].offsetHeight; // jshint ignore:line
		
		this.tl.show.play(0);
	}
	
	
	hide() {
		this.tl.hide.play(0);
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
		this.$percentage[0].innerHTML					= '0 %';
		this.$progress[0].style[ STF.Props.TRANSFORM ]	= 'translate(-100%, 0%)';
		
		this.$loader[0].style.display					= 'none';
		
		this.dispatch( this.E.HIDDEN );
	}
	
	
}


return new MainLoader();


} ) ( window );

