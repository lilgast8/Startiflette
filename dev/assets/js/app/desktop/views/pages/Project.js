

STF.Views		= STF.Views || {};
STF.Views.Pages	= STF.Views.Pages || {};


STF.Views.Pages.Project = ( function( window ) {
	'use strict';
	
	
	function Project() {
		STF.AbstractView.call( this );
	}
	
	
	Project.prototype				= Object.create( STF.AbstractView.prototype );
	Project.prototype.constructor	= Project;
	
	
	Project.prototype.init = function() {
		STF.AbstractView.prototype.init.call( this );
	};
	
	
	Project.prototype.bindEvents = function() {
		STF.AbstractView.prototype.bindEvents.call( this );
	};
	
	
	Project.prototype.unbindEvents = function() {
		STF.AbstractView.prototype.unbindEvents.call( this );
	};
	
	
	Project.prototype.resize = function() {
		
	};
	
	
	return Project;
	
	
} ) ( window );

