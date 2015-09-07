

APP.MainView = ( function( window ) {
	
	
	function MainView() {
		APP.AbstractView.call( this );
	}
	
	
	MainView.prototype				= Object.create( APP.AbstractView.prototype );
	MainView.prototype.constructor	= MainView;
	
	
	MainView.prototype.init = function() {
		console.log('MainView.init()');
		
		this.initDOM();
	};
	
	
	MainView.prototype.initDOM = function() {
		this.$.window	= $( window );
		this.$.body		= $( document.body );
		this.$.mainCont	= $( document.getElementById( 'main-container' ) );
		this.$.pageCont	= $( document.getElementById( 'page-container' ) );
	};
	
	
	return MainView;
	
	
} ) ( window );

