

APP.EventDispatcher = (function(window){
	
	
	function EventDispatcher() {
		this.events = {};
		this.EVENT  = {};
	}
	
	
	EventDispatcher.prototype.buildEvt = function(name, fct) {
		this.events[name] = new signals.Signal();
		this.events[name].add(fct);
	};
		
		
	EventDispatcher.prototype.destroyEvt = function(name, fct) {
		this.events[name].remove(fct);
		delete this.events[name];
	};
		
		
	EventDispatcher.prototype.dispatch = function(name, params) {
		if(params === undefined) this.events[name].dispatch();
		else this.events[name].dispatch(params);
	};
	
	
	return EventDispatcher;
	
	
})(window);

