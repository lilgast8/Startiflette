

STF.Views		= STF.Views || {};
STF.Views.Pages	= STF.Views.Pages || {};


STF.Views.Pages.About = ( function( window ) {
	'use strict';
	
	
	function About() {
		STF.AbstractView.call( this );
	}
	
	
	About.prototype				= Object.create( STF.AbstractView.prototype );
	About.prototype.constructor	= About;
	
	
	About.prototype.initDOM = function() {
		STF.AbstractView.prototype.initDOM.call( this );
	};
	
	
	About.prototype.bindEvents = function() {
		$( '.hash' ).on( 'click', $.proxy( this.changeUrl, this ) );
		$( '.search' ).on( 'click', $.proxy( this.changeUrl, this ) );
	};
	
	
	About.prototype.unbindEvents = function() {
		
	};
	
	
	About.prototype.resize = function() {
		
	};
	
	
	return About;
	
	
} ) ( window );

