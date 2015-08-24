

var App = function(){
	this.$ = {};
	this.p = {};
	this.v = {};
};


App.prototype.init = function() {
	console.log('init App', this);
};



module.exports = App;