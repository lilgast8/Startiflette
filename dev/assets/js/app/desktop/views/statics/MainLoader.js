

STF.Views			= STF.Views || {};
STF.Views.Statics	= STF.Views.Statics || {};


STF.Views.Statics.MainLoader = ( function( window ) {
	'use strict';
	
	
	function MainLoader() {
		STF.AbstractMainLoader.call( this );
	}
	
	
	MainLoader.prototype				= Object.create( STF.AbstractMainLoader.prototype );
	MainLoader.prototype.constructor	= MainLoader;
	
	
	/*MainLoader.prototype.init = function() {
		STF.AbstractMainLoader.prototype.init.call( this );
	};*/
	
	
	MainLoader.prototype.initDOM = function() {
		this.$loader		= $( document.getElementById( 'main-loader' ) );
		this.$loaderCont	= this.$loader.find( '.main-loader-container' );
		this.$percentage	= this.$loader.find( '.main-loader-percentage' );
		this.$progress		= this.$loader.find( '.main-loader-progress' );
		this.$loading		= this.$loader.find( '.main-loader-loading' );
	};
	
	
	MainLoader.prototype.initTl = function() {
		/* Hide init */
		this.tl.hideInit = new TimelineLite( { paused:true, onComplete:_onHideInitComplete.bind( this ) } );
		
		this.tl.hideInit.to( this.$loader, 1.5, { xPercent:100, ease:Quart.easeInOut }, 0 );
		this.tl.hideInit.to( this.$loaderCont, 1.5, { xPercent:-100, ease:Quart.easeInOut }, 0 );
		
		
		/* Show */
		this.tl.show = new TimelineLite( { paused:true, onComplete:_onShowComplete.bind( this ) } );
		
		this.tl.show.set( this.$loader, { xPercent:-100 }, 0 );
		this.tl.show.set( this.$loaderCont, { xPercent:100 }, 0 );
		this.tl.show.to( this.$loader, 1, { xPercent:0, ease:Quart.easeInOut }, 0 );
		this.tl.show.to( this.$loaderCont, 1, { xPercent:0, ease:Quart.easeInOut }, 0 );
		
		
		/* Hide */
		this.tl.hide = new TimelineLite( { paused:true, onComplete:_onHideComplete.bind( this ) } );
		
		this.tl.hide.to( this.$loader, 1, { xPercent:100, ease:Quart.easeInOut }, 0 );
		this.tl.hide.to( this.$loaderCont, 1, { xPercent:-100, ease:Quart.easeInOut }, 0 );
	};
	
	
	MainLoader.prototype.onProgress = function( percentage ) {
		var posX = percentage - 100;
		
		this.$percentage[0].innerHTML					= parseInt( percentage ) + ' %';
		this.$progress[0].style[ STF.Props.TRANSFORM ]	= 'translate(' + posX + '%, 0%)';
	};
	
	
	MainLoader.prototype.hideInit = function() {
		this.tl.hideInit.play();
		
		
		// this.$loader[0].style.display = 'none';
		// this.dispatch( this.E.HIDDEN );
	};
	
	
	MainLoader.prototype.show = function() {
		this.$loader[0].style.display = 'block';
		this.$loader[0].offsetHeight; // jshint ignore:line
		
		this.tl.show.play(0);
	};
	
	
	MainLoader.prototype.hide = function() {
		this.tl.hide.play(0);
	};
	
	
	var _onHideInitComplete = function() {
		this.killTimeline( 'hideInit' );
		
		STF_dom_removeClass( this.$loader[0], 'init' );
		this.$loader[0].style.display = 'none';
		
		this.dispatch( this.E.HIDDEN );
	};
	
	
	var _onShowComplete = function() {
		this.dispatch( this.E.SHOWN );
	};
	
	
	var _onHideComplete = function() {
		// LOADING_MODE == 'byPageStatic' && LOADING_MODE == 'byPageDynamic'
		this.$percentage[0].innerHTML					= '0 %';
		this.$progress[0].style[ STF.Props.TRANSFORM ]	= 'translate(-100%, 0%)';
		
		this.$loader[0].style.display					= 'none';
		
		this.dispatch( this.E.HIDDEN );
	};
	
	
	return new MainLoader();
	
	
} ) ( window );

