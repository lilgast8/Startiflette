

STF.Views		= STF.Views || {};
STF.Views.Pages	= STF.Views.Pages || {};


STF.Views.Pages.Project = ( function( window ) {
	'use strict';
	
	
	function Project() {
		STF.AbstractView.call( this );
	}
	
	
	Project.prototype				= Object.create( STF.AbstractView.prototype );
	Project.prototype.constructor	= Project;
	
	
	Project.prototype.initDOM = function() {
		this.$page = $( document.getElementById( 'page-content' ) );
	};
	
	
	Project.prototype.bindEvents = function() {
		
	};
	
	
	Project.prototype.unbindEvents = function() {
		
	};
	
	
	Project.prototype.resize = function() {
		
	};
	
	
	return Project;
	
	
} ) ( window );

