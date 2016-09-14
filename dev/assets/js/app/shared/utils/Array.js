

STF.Utils = STF.Utils || {};


STF.Utils.Array = ( function( window ) {
	'use strict';
	
	
	/**
	 * Insert value(s) in a array
	 * @params {array} array: array where the value(s) will be inserted
	 * @params {int} index: index of the array
	 * @params {string, number, int or array} item: value or array of values
	 * @return {array} array: new array
	 */
	window.STF_arr_insert = function( array, index, item ) {
		if ( typeof item != 'object' )
			array.splice( index, 0, item );
		
		else
			item.map( function( value, i ) {
				return array.splice( index + i, 0, value );
			} );
		
		
		return array;
	};
	
	
} ) ( window );

