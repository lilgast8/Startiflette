

APP.Views = APP.Views || {};
APP.Views.Page = APP.Views.Page || {};


APP.Views.Page.Projects = (function(window){
	
	
	function Projects() {
		APP.ViewPage.call(this);
		
		this.name = 'projects';
	}
	
	
	Projects.prototype = Object.create(APP.ViewPage.prototype);
	Projects.prototype.constructor = Projects;
	
	
	Projects.prototype.initElt = function() {
		this.$.page = $(document.getElementById('page-content'));
		this.$.projectLink = this.$.page.find('.project-link');
	};
	
	
	Projects.prototype.bindEvents = function() {
		this.p.resizeWindow = $.proxy(_resize, this);
		APP.Main.$.window.on('resize', this.p.resizeWindow);
		
		this.p.clickChangePage = $.proxy(this.changePage, this);
		this.$.projectLink.on('click', this.p.clickChangePage);
	};
	
	
	Projects.prototype.unbindEvents = function() {
		APP.Main.$.window.off('resize', this.p.resizeWindow);
		this.$.projectLink.off('click', this.p.clickChangePage);
		
		this.p = {};
	};
	
	
	var _resize = function() {
		APP.Main.resize();
	};
	
	
	return new Projects();
	
	
})(window);

