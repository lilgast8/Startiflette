

APP.AbstractController = ( function( window ) {
	
	
	function AbstractController() {
		APP.EventDispatcher.call( this );
		
		this.v	= {};
		this.o	= {};
		this.tw	= {};
		this.tl	= {};
	}
	
	
	AbstractController.prototype				= Object.create( APP.EventDispatcher.prototype );
	AbstractController.prototype.constructor	= AbstractController;
	
	
	AbstractController.prototype.init = function() {
		
	};
	
	
	AbstractController.prototype.instanceView = function() {
		
	};
	
	
	AbstractController.prototype.initView = function() {
		
	};
	
	
	AbstractController.prototype.show = function() {
		
	};
	
	
	AbstractController.prototype.hide = function() {
		
	};
	
	
	AbstractController.prototype.viewShown = function() {
		
	};
	
	
	AbstractController.prototype.viewHidden = function() {
		
	};
	
	
	AbstractController.prototype.bindEvents = function() {
		
	};
	
	
	AbstractController.prototype.unbindEvents = function() {
		
	};
	
	
	AbstractController.prototype.destroyGSAP = function() {
		
	};
	
	
	AbstractController.prototype.killTween = function(twName) {
		
	};
	
	
	AbstractController.prototype.killTimeline = function(tlName) {
		
	};
	
	
	AbstractController.prototype.destroy = function() {
		
	};
	
	
	AbstractController.prototype.resize = function() {
		
	};
	
	
	return AbstractController;
	
	
} ) ( window );

