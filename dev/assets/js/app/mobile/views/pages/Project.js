

STF.Views		= STF.Views || {};
STF.Views.Pages	= STF.Views.Pages || {};


STF.Views.Pages.Project = ( function( window ) {
	'use strict';
	
	
	function Project() {
		STF.AbstractPageView.call( this );
	}
	
	
	Project.prototype				= Object.create( STF.AbstractPageView.prototype );
	Project.prototype.constructor	= Project;
	
	
	Project.prototype.init = function() {
		STF.AbstractPageView.prototype.init.call( this );
	};
	
	
	Project.prototype.bindEvents = function() {
		STF.AbstractPageView.prototype.bindEvents.call( this );
	};
	
	
	Project.prototype.unbindEvents = function() {
		STF.AbstractPageView.prototype.unbindEvents.call( this );
	};
	
	
	Project.prototype.resize = function() {
		
	};
	
	
	return Project;
	
	
} ) ( window );

