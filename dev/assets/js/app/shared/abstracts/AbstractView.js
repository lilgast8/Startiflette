

STF.AbstractView = ( function( window ) {
	'use strict';
	
	
	function AbstractView() {
		STF.EventDispatcher.call( this );
		
		this.E = {
			SHOWN:	'shown',
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
		this.bindEvents();
		this.initTl();
		
		this.isInit = true;
		
		this.resize();
	};
	
	
	AbstractView.prototype.initDOM = function() {
		// console.log('AbstractView.initDOM()');
	};
	
	
	AbstractView.prototype.initEl = function() {
		// console.log('AbstractView.initEl()');
	};
	
	
	AbstractView.prototype.bindEvents = function() {
		// console.log('AbstractView.bindEvents()');
	};
	
	
	AbstractView.prototype.unbindEvents = function() {
		// console.log('AbstractView.unbindEvents()');
	};
	
	
	AbstractView.prototype.initTl = function() {
		// console.log('AbstractView.initTl()');
	};
	
	
	AbstractView.prototype.initView = function() {
		// console.log('AbstractView.initView()');
	};
	
	
	AbstractView.prototype.show = function() {
		// console.log('AbstractView.show()');
		
		// console.log(this);
		this.dispatch( this.E.SHOWN );
	};
	
	
	AbstractView.prototype.hide = function() {
		// console.log('AbstractView.hide()');
		
		// console.log(this);
		this.dispatch( this.E.HIDDEN );
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
	
	
	AbstractView.prototype.destroy = function() {
		this.unbindEvents();
		
		this.destroyGSAP();
	};
	
	
	AbstractView.prototype.resize = function() {
		// console.log('AbstractView.resize()');
	};
	
	
	AbstractView.prototype.changePage = function( e ) {
		if ( STF.Config.HAS_PUSHSTATE ) { // if pushstate supported
			e.preventDefault();
			
			var url = e.currentTarget.href;
			
			STF.Router.navigateTo( url );
		}
	};
	
	
	return AbstractView;
	
	
} ) ( window );

