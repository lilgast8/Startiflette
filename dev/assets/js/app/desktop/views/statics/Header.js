

STF.Views			= STF.Views || {};
STF.Views.Statics	= STF.Views.Statics || {};


STF.Views.Statics.HeaderView = ( function( window ) {
	
	
	function HeaderView() {
		STF.AbstractView.call( this );
	}
	
	
	HeaderView.prototype				= Object.create( STF.AbstractView.prototype );
	HeaderView.prototype.constructor	= HeaderView;
	
	
	HeaderView.prototype.initDOM = function() {
		this.$header	= $( document.getElementById( 'header' ) );
		this.$menu		= $( document.getElementById( 'menu' ) );
		this.$menuLink	= this.$menu.find( '.menu-link' );
	};
	
	
	HeaderView.prototype.bindEvents = function() {
		this.$menuLink.on( 'click', $.proxy( this.changePage, this ) );
	};
	
	
	return new HeaderView();
	
	
} ) ( window );

