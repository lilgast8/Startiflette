

STF.Views			= STF.Views || {};
STF.Views.Statics	= STF.Views.Statics || {};


STF.Views.Statics.Header = ( function( window ) {
	'use strict';
	
	
	function Header() {
		STF.AbstractView.call( this );
	}
	
	
	Header.prototype				= Object.create( STF.AbstractView.prototype );
	Header.prototype.constructor	= Header;
	
	
	Header.prototype.initDOM = function() {
		this.$header	= $( document.getElementById( 'header' ) );
		this.$menu		= $( document.getElementById( 'menu' ) );
		this.$menuLink	= this.$menu.find( '.menu-link' );
	};
	
	
	Header.prototype.bindEvents = function() {
		this.$menuLink.on( 'click', $.proxy( this.changePage, this ) );
	};
	
	
	return new Header();
	
	
} ) ( window );

