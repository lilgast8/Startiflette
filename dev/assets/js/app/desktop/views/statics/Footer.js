'use strict';


var AbstractView = require( 'shared/abstracts/views/AbstractView' );



function Footer() {
	AbstractView.call( this );
}


Footer.prototype				= Object.create( AbstractView.prototype );
Footer.prototype.constructor	= Footer;


Footer.prototype.initDOM = function() {
	this.$footer		= $( document.getElementById( 'footer' ) );
	this.$footerLgLink	= this.$footer.find( '.footer-lang-link' );
	this.$footerLink	= this.$footer.find( '.footer-link' );
};


Footer.prototype.bindEvents = function() {
	AbstractView.prototype.bindEvents.call( this );
	
	this.$footerLink.on( 'click', $.proxy( this.changeUrl, this ) );
};


module.exports = new Footer();

