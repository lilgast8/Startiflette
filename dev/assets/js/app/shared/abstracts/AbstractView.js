

APP.AbstractView = ( function( window ) {
	
	
	function AbstractView() {
		APP.EventDispatcher.call( this );
		
		this.E = {
			// INIT:	'init',
			SHOWN:	'shown',
			HIDDEN:	'hidden'
		};
		
		this.tw	= {};
		this.tl	= {};
	}
	
	
	AbstractView.prototype				= Object.create( APP.EventDispatcher.prototype );
	AbstractView.prototype.constructor	= AbstractView;
	
	
	AbstractView.prototype.init = function() {
		this.initDOM();
		this.bindEvents();
		this.initTl();
	};
	
	
	AbstractView.prototype.initDOM = function() {
		// console.log('AbstractView.initDOM()');
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
		
		this.$ = {};
		this.p = {};
		this.v = {};
	};
	
	
	AbstractView.prototype.resize = function() {
		// console.log('AbstractView.resize()');
	};
	
	
	AbstractView.prototype.changePage = function( e ) {
		if ( APP.Config.HAS_PUSHSTATE ) { // if pushstate supported
			e.preventDefault();
			
			var url = e.currentTarget.href;
			
			// APP.Router.goToPage(url);
			APP.Router.navigateTo( url );
			// APP.PagesController.navigateTo( url );
		}
	};
	
	
	return AbstractView;
	
	
} ) ( window );

