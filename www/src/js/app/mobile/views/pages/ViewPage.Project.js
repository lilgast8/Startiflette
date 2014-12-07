

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
		this.p.resizeWindow = $.proxy(_resize, this);
		APP.Main.$.window.on('resize', this.p.resizeWindow);
	};
	
	
	Project.prototype.unbindEvents = function() {
		APP.Main.$.window.off('resize', this.p.resizeWindow);
		
		this.p = {};
	};
	
	
	var _resize = function() {
		APP.Main.resize();
	};
	
	
	return new Project();
	
	
})(window);

