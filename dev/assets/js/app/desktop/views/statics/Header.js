

STF.Views.Statics.Header = new class Header extends STF.Abstracts.AbstractView {
	
	
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
	
	
}();

