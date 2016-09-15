

STF.EventDispatcher = ( function( window ) {
	'use strict';
	
	
	function EventDispatcher() {
		this.e = {};
		this.E = {};
	}
	
	
	EventDispatcher.prototype.buildEvt = function( name, fct, context ) {
	// EventDispatcher.prototype.bind = function( name, fct, context ) {
		
		if ( !context && STF.Config.ENV != 'prod' )
			console.warn( 'Bind "' + name + '" custom event without context.' );
		
		if ( this.e[ name ] === undefined ) // if the custom event doesn't exist, create it
			this.e[ name ] = new signals.Signal();
		
		this.e[ name ].add( fct, context ); // add the listener to the custom event
	};
	
	
	EventDispatcher.prototype.destroyEvt = function( name, fct, context ) {
	// EventDispatcher.prototype.unbind = function( name, fct, context ) {
		// console.log( '⚡️', name, fct );
		
		if ( !name && STF.Config.ENV != 'prod' ) {
			console.warn( 'You must to define a name to unbind a custom event.' );
			
			return;
		}
		
		console.log( '🏀🏀', this.e[ name ].getNumListeners() );
		
		/*if ( ( name === null || name === undefined ) && ( fct === null || fct === undefined ) ) {
			console.warn( 'You try to unbind a custom event with a "' + name + '" name and a "' + fct + '" function. You must at least to define one of them.' );
			
			return;
		}*/
		
		
		if ( fct !== undefined && fct !== null ) { // remove a single listener from the custom event
			console.log( 'remove one:', name, '———', context, fct );
			this.e[ name ].remove( fct, context );
			// this.e[ name ].dispose();
			// delete this.e[ name ];
		}
		else { // remove all listeners from the custom event
			console.log( 'remove all', name, '———', context, fct );
			this.e[ name ].removeAll();
			// delete this.e[ name ];
		}
		/*else {
			if ( STF.Config.ENV != 'prod' )
				console.warn( 'You removed all the custom events in ' + STF_gl_getConstructorName( this ) + '.' );
			
			for ( var evtName in this.e )
				this.destroyEvt( evtName );
		}*/
		
		console.log( '🏀', this.e[ name ].getNumListeners() );
		if ( this.e[ name ].getNumListeners() === 0 ) { // dispose & delete the event if listeners no longer exist
			console.log( '⚡️ delete event' );
			
			this.e[ name ].dispose();
			delete this.e[ name ];
		}
	};
	
	
	EventDispatcher.prototype.dispatch = function( name, params ) {
		if ( this.e[ name ] === undefined && STF.Config.ENV != 'prod' ) { // if the event is not registred
			console.warn( 'Trying to dispath "' + name + '" custom event which is undefined.' );
			
			return;
		}
		
		if ( params === undefined )
			this.e[ name ].dispatch();
		else
			this.e[ name ].dispatch( params );
	};
	
	
	/*var _addId = function( event, id ) {
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
	};*/
	
	
	return EventDispatcher;
	
	
} ) ( window );

