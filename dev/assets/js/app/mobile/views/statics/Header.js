

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
		this.$header		= $( document.getElementById( 'header' ) );
		this.$headerLgLink	= this.$header.find( '.header-lang-link' );
		this.$menu			= $( document.getElementById( 'menu' ) );
		this.$menuLink		= this.$menu.find( '.menu-link' );
	};
	
	
	Header.prototype.bindEvents = function() {
		STF.AbstractView.prototype.bindEvents.call( this );
		
		this.$menuLink.on( 'click', $.proxy( this.changeUrl, this ) );
	};
	
	
	return new Header();
	
	
} ) ( window );

