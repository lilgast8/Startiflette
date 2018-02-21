

STF.Views			= STF.Views || {};
STF.Views.Statics	= STF.Views.Statics || {};


STF.Views.Statics.Header = ( function( window ) {


class Header extends STF.AbstractView {
	
	
	constructor() {
		super();
	}
	
	
	initDOM() {
		this.$header		= $( document.getElementById( 'header' ) );
		this.$headerLgLink	= this.$header.find( '.header-lang-link' );
		this.$menu			= $( document.getElementById( 'menu' ) );
		this.$menuLink		= this.$menu.find( '.menu-link' );
	}
	
	
	bindEvents() {
		super.bindEvents();
		
		this.$menuLink.on( 'click', $.proxy( this.changeUrl, this ) );
	}
	
	
}


return new Header();


} ) ( window );

