

APP.Views = APP.Views || {};
APP.Views.Page = APP.Views.Page || {};


APP.Views.Page.Project = (function(window){
	
	
	function Project() {
		APP.ViewPage.call(this);
		
		this.name = 'project';
	}
	
	
	Project.prototype = Object.create(APP.ViewPage.prototype);
	Project.prototype.constructor = Project;
	
	
	Project.prototype.initEl = function() {
		this.$.page = $(document.getElementById('page-content'));
	};
	
	
	Project.prototype.bindEvents = function() {
		
	};
	
	
	Project.prototype.unbindEvents = function() {
		
	};
	
	
	Project.prototype.resize = function() {
		
	};
	
	
	return new Project();
	
	
})(window);

