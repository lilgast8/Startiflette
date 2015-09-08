

APP.EventDispatcher = ( function( window ) {
	
	
	function EventDispatcher() {
		this.e			= {};
		this.E			= {};
		this.evt		= {};
		this.activeEvt	= [];
	}
	
	
	EventDispatcher.prototype.setEvt = function( name ) {
		
	};
	
	
	EventDispatcher.prototype.addEvt = function( name ) {
		
	};
	
	
	EventDispatcher.prototype.removeEvt = function( name ) {
		
	};
	
	
	EventDispatcher.prototype.buildEvt = function( name, fct ) {
		this.e[ name ] = new signals.Signal();
		this.e[ name ].add(fct);
	};
		
		
	EventDispatcher.prototype.destroyEvt = function( name, fct ) {
		this.e[ name ].remove( fct );
		delete this.e[ name ];
	};
		
		
	EventDispatcher.prototype.dispatch = function( name, params ) {
		if ( params === undefined )
			this.e[ name ].dispatch();
		else
			this.e[ name ].dispatch( params );
	};
	
	
	return EventDispatcher;
	
	
} ) ( window );

