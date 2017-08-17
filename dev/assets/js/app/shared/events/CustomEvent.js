'use strict';


var signals	= require( 'signals' );

var Config	= require( 'shared/configs/Config' );



function CustomEvent() {
	this.e						= {};
	this.E						= {};
	
	this.isWarningDispatched	= false;
}


CustomEvent.prototype.bind = function( name, fct, context ) {
	if ( !name || !fct ) {
		if ( !Config.IS_PROD ) {
			var missingParams;
			
			if ( !name && !fct )
				missingParams = 'name and a function';
			else if ( !name )
				missingParams = 'name';
			else if ( !fct )
				missingParams = 'function';
			
			console.warn( 'You must to provide a ' + missingParams + ' to the custom event you want to bind.' );
		}
		
		return;
	}
	
	if ( !context && !Config.IS_PROD )
		console.warn( 'Bind "' + name + '" custom event without context.' );
	
	if ( this.e[ name ] === undefined ) // if the custom event doesn't exist, create it
		this.e[ name ] = new signals.Signal();
	
	this.e[ name ].add( fct, context ); // add the listener to the custom event
};


CustomEvent.prototype.unbind = function( name, fct, context ) {
	if ( !name ) {
		if ( !Config.IS_PROD )
			console.warn( 'You must to define the name of the custom event you want to unbind.' );
		
		return;
	}
	
	
	if ( fct !== undefined && fct !== null ) // remove a single listener from the custom event
		this.e[ name ].remove( fct, context );
	
	else // remove all listeners from the custom event
		this.e[ name ].removeAll();
	
	
	if ( this.e[ name ].getNumListeners() === 0 ) { // dispose & delete the event if listeners no longer exist
		this.e[ name ].dispose();
		delete this.e[ name ];
	}
};


CustomEvent.prototype.dispatch = function( name, params ) {
	if ( this.e[ name ] === undefined ) { // if the event is not registred
		if ( !Config.IS_PROD && !this.isWarningDispatched ) {
			console.warn( 'Trying to dispath "' + name + '" custom event which is undefined.' );
			
			this.isWarningDispatched = true;
		}
		
		return;
	}
	
	if ( params === undefined )
		this.e[ name ].dispatch();
	else
		this.e[ name ].dispatch( params );
};


module.exports = CustomEvent;

