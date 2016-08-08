

STF.EventDispatcher = ( function( window ) {
	'use strict';
	
	
	function EventDispatcher() {
		this.e = {};
		this.E = {};
	}
	
	
	EventDispatcher.prototype.buildEvt = function( name, fct, id ) {
		id = id === undefined ? STF_gl_getConstructorName( this ).toLowerCase() : id;
		
		if ( this.e[ name ] === undefined )
			this.e[ name ] = new signals.Signal();
		
		this.e[ name ].add( fct );
		
		if ( id !== undefined )
			_addId.call( this, this.e[ name ], id );
	};
	
	
	var _addId = function( event, id ) {
		for ( var i = 0; i < event._bindings.length; i++ ) {
			
			if ( event._bindings[ i ].id === undefined ) {
				event._bindings[0].id = id;
				
				break;
			}
			
		}
	};
	
	
	EventDispatcher.prototype.destroyEvt = function( name, fct, id ) {
		id = id === undefined ? STF_gl_getConstructorName( this ).toLowerCase() : id;
		
		if ( this.e[ name ].getNumListeners() == 1 ) {
			this.e[ name ].remove( fct );
			delete this.e[ name ];
		}
		else {
			for ( var i = 0; i < this.e[ name ]._bindings.length; i++ ) {
				if ( id == this.e[ name ]._bindings[ i ].id ) {
					this.e[ name ]._bindings[ i ].detach();
					
					break;
				}
			}
		}
	};
	
	
	EventDispatcher.prototype.dispatch = function( name, params ) {
		if ( params === undefined )
			this.e[ name ].dispatch();
		else
			this.e[ name ].dispatch( params );
	};
	
	
	return EventDispatcher;
	
	
} ) ( window );

