

STF.AbstractView = ( function( window ) {
	'use strict';
	
	
	function AbstractView() {
		STF.EventDispatcher.call( this );
		
		this.E = {
			SHOW:	'show',
			SHOWN:	'shown',
			HIDE:	'hide',
			HIDDEN:	'hidden'
		};
		
		this.tw		= {};
		this.tl		= {};
		
		this.isInit	= false;
	}
	
	
	AbstractView.prototype				= Object.create( STF.EventDispatcher.prototype );
	AbstractView.prototype.constructor	= AbstractView;
	
	
	AbstractView.prototype.init = function() {
		this.initDOM();
		this.initEl();
		this.initTl();
		this.bindEvents();
		
		this.resize();
	};
	
	
	AbstractView.prototype.initDOM = function() {
		// console.log( 'AbstractView.initDOM() — ', this.constructor.name );
		
		this.$page = $( document.getElementById( 'page' ) );
	};
	
	
	AbstractView.prototype.initEl = function() {
		// console.log( 'AbstractView.initEl() — ', this.constructor.name );
		
		if ( STF.PagesController.HAS_LAZYLOAD && this.$page !== undefined )
			this.lazyloader = new STF.LazyLoader( this.$page );
	};
	
	
	AbstractView.prototype.initTl = function() {
		// console.log( 'AbstractView.initTl() — ', this.constructor.name );
	};
	
	
	AbstractView.prototype.bindEvents = function() {
		// console.log( 'AbstractView.bindEvents() — ', this.constructor.name );
	};
	
	
	AbstractView.prototype.unbindEvents = function() {
		// console.log( 'AbstractView.unbindEvents() — ', this.constructor.name );
	};
	
	
	AbstractView.prototype.initView = function() {
		// console.log( 'AbstractView.initView() — ', this.constructor.name );
		
		this.isInit = true;
	};
	
	
	AbstractView.prototype.show = function() {
		// console.log( 'AbstractView.show() — ', this.constructor.name );
		
		this.dispatch( this.E.SHOWN );
	};
	
	
	AbstractView.prototype.hide = function() {
		// console.log( 'AbstractView.hide() — ', this.constructor.name );
		
		this.dispatch( this.E.HIDDEN );
	};
	
	
	AbstractView.prototype.resize = function() {
		// console.log( 'AbstractView.resize() — ', this.constructor.name );
	};
	
	
	AbstractView.prototype.raf = function() {
		// console.log( 'AbstractView.raf() — ', this.constructor.name );
	};
	
	
	AbstractView.prototype.destroy = function() {
		this.isInit = false;
		
		if ( STF.PagesController.HAS_LAZYLOAD && this.$page !== undefined )
			this.lazyloader.destroy();
		
		this.unbindEvents();
		
		this.destroyGSAP();
	};
	
	
	AbstractView.prototype.destroyGSAP = function() {
		/* tween */
		for ( var tween in this.tw ) {
			var tw = this.tw[ tween ];
			
			tw.kill();
		}
		
		/* timeline */
		for ( var timeline in this.tl ) {
			var tl = this.tl[ timeline ];
			
			tl.stop();
			tl.clear();
			tl.kill();
		}
		
		this.tl = {};
		this.tw = {};
	};
	
	
	AbstractView.prototype.killTween = function( twName ) {
		if ( !this.tw[ twName ] )
			return;
		
		this.tw[ twName ].kill();
		
		this.tw[ twName ] = null;
	};
	
	
	AbstractView.prototype.killTimeline = function( tlName ) {
		if ( !this.tl[ tlName ] )
			return;
		
		this.tl[ tlName ].stop();
		this.tl[ tlName ].clear();
		this.tl[ tlName ].kill();
		
		this.tl[ tlName ] = null;
	};
	
	
	AbstractView.prototype.changeUrl = function( e ) {
		if ( STF.Props.HAS_PUSHSTATE ) { // if pushstate supported
			e.preventDefault();
			
			var url = e.currentTarget.href;
			
			STF.Router.updateUrl( url );
		}
	};
	
	
	AbstractView.prototype.updateSearch = function() {
		if ( STF.Config.ENV != 'prod' )
			console.error( 'You need to override the updateSearch() method from AbstractView in the current page view.' );
	};
	
	
	AbstractView.prototype.updateHash = function() {
		if ( STF.Config.ENV != 'prod' )
			console.error( 'You need to override the updateHash() method from AbstractView in the current page view.' );
	};
	
	
	return AbstractView;
	
	
} ) ( window );

