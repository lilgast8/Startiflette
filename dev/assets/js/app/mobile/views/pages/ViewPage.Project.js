

STF.Views = STF.Views || {};
STF.Views.Page = STF.Views.Page || {};


STF.Views.Page.Project = (function(window) {
	
	
	function Project() {
		STF.ViewPage.call(this);
		
		this.name = 'project';
	}
	
	
	Project.prototype = Object.create(STF.ViewPage.prototype);
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

