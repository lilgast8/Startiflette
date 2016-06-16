

STF.EventDispatcher = ( function( window ) {
	'use strict';
	
	
	function EventDispatcher() {
		this.e = {};
		this.E = {};
	}
	
	
	EventDispatcher.prototype.buildEvt = function( name, fct, id ) {
		id = id === undefined ? getConstructorName( this ).toLowerCase() : id;
		console.log( '///--------///', getConstructorName( this ), ':', name, id );
		
		if ( name == 'resize' )
			// console.log( '---> buildEvt:', this.constructor.name, ':', name, '/', this.e[ name ] );
			console.log( '---> buildEvt:', this.constructor.name, ':', name );
		// console.log( this.e[ name ] );
		
		if ( this.e[ name ] === undefined )
			this.e[ name ] = new signals.Signal();
		
		// this.e[ name ].add( fct );
		// console.log( toString.call( context ) );
		// if ( context !== undefined )
			// console.log( '-------->', context.constructor.toString().match(/function\s(\w*)/)[1] );
			// console.log( '-------->', getConstructorName( context ) );
		
		this.e[ name ].add( fct );
		
		/*if( id !== undefined ) {
		// 	console.log( this.e[ name ]._bindings[0] );
			this.e[ name ]._bindings[0].id = id;
		// 	console.log( this.e[ name ]._bindings[0] );
		}*/
		
		if ( id !== undefined ) {
			
			_addId.call( this, this.e[ name ], id );
			
			/*for ( var i = 0; i < this.e[ name ]._bindings.length; i++ ) {
				if ( this.e[ name ]._bindings[ i ].id === undefined )
					this.e[ name ]._bindings[0].id = id;
					
					break;
			}*/
			
		}
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
		id = id === undefined ? getConstructorName( this ).toLowerCase() : id;
		
		console.log( 'SLP', name, id );
		
		/*if ( name == 'resize' ) {
			// console.log( 'destroyEvt', name );
			// console.log( '--->', this.constructor.name, this.e[ name ]._bindings.length );
			console.log( '--->', this.constructor.name, this.e[ name ].getNumListeners() );
			// console.log( this.constructor.name, this.e[ name ]._bindings.getListener() );
		}*/
		
		if ( this.e[ name ].getNumListeners() == 1 ) {
			console.log( 'destroy simple event:', name );
			this.e[ name ].remove( fct );
			delete this.e[ name ];
		}
		else {
			console.log( 'destroy multiple event', name );
			// var contextName = getConstructorName( context );
			// this.e[ name ].detach();
			for ( var i = 0; i < this.e[ name ]._bindings.length; i++ ) {
				// console.log( '-------->', contextName, '/', getConstructorName( this.e[ name ]._bindings[ i ].context ), '<--------' );
				// console.log( '-------->', id, '/', this.e[ name ]._bindings[ i ].id, '<--------' );
				
				if ( id == this.e[ name ]._bindings[ i ].id ) {
					// console.log( 'SLPSLPSLPSLPSLPSLPSLPSLP --->', id );
					
					this.e[ name ]._bindings[ i ].detach();
					
					break;
				}
				
				// if ( contextName == getConstructorName( this.e[ name ]._bindings[ i ].context ) ) {
				// 	this.e[ name ]._bindings[ i ].detach();
				// }
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

