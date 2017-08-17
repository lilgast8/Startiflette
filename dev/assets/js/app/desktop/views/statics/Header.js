'use strict';


// var AbstractView = require( 'shared/abstracts/views/AbstractView' );
// console.log( AbstractView );


function Header() {
	AbstractView.call( this );
}


Header.prototype				= Object.create( AbstractView.prototype );
Header.prototype.constructor	= Header;


Header.prototype.initDOM = function() {
	this.$header		= $( document.getElementById( 'header' ) );
	this.$headerLgLink	= this.$header.find( '.header-lang-link' );
	this.$menu			= $( document.getElementById( 'menu' ) );
	this.$menuLink		= this.$menu.find( '.menu-link' );
};


Header.prototype.bindEvents = function() {
	AbstractView.prototype.bindEvents.call( this );
	
	this.$menuLink.on( 'click', $.proxy( this.changeUrl, this ) );
};


module.exports = new Header();


