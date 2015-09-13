

APP.Views = APP.Views || {};
APP.Views.Page = APP.Views.Page || {};


APP.Views.Page.Projects = (function(window) {
	
	
	function Projects() {
		APP.ViewPage.call(this);
		
		this.name = 'projects';
	}
	
	
	Projects.prototype = Object.create(APP.ViewPage.prototype);
	Projects.prototype.constructor = Projects;
	
	
	Projects.prototype.initEl = function() {
		this.$.page = $(document.getElementById('page-content'));
		this.$.projectLink = this.$.page.find('.project-link');
	};
	
	
	Projects.prototype.bindEvents = function() {
		this.p.clickProjectLink = $.proxy(this.changePage, this);
		this.$.projectLink.on('click', this.p.clickProjectLink);
	};
	
	
	Projects.prototype.unbindEvents = function() {
		this.$.projectLink.off('click', this.p.clickProjectLink);
	};
	
	
	Projects.prototype.resize = function() {
		
	};
	
	
	return new Projects();
	
	
})(window);

