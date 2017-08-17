'use strict';


var Config		= require( 'shared/configs/Config' );
var FPSStats	= require( 'shared/utils/FPSStats' );
var MemoryStats	= require( 'shared/utils/MemoryStats' );
var DatGUI		= require( 'shared/utils/DatGUI' );



function Debug() {
	
}


Debug.prototype.init = function( isInitFPSStats, isInitMemoryStats, isInitDatGUI ) {
	_initFPSStats.call( this, isInitFPSStats );
	_initMemoryStats.call( this, isInitMemoryStats );
	_initDatGUI.call( this, isInitDatGUI );
};


var _initFPSStats = function( isSet ) {
	Config.setFPSStats( isSet );
	
	if ( isSet && ( Config.IS_DEV || Config.IS_PREPROD_LOCAL ) )
		FPSStats.init();
};


var _initMemoryStats = function( isSet ) {
	Config.setMemoryStats( isSet );
	
	if ( isSet && ( Config.IS_DEV || Config.IS_PREPROD_LOCAL ) )
		MemoryStats.init();
};


var _initDatGUI = function( isSet ) {
	if ( isSet && ( Config.IS_DEV || Config.IS_PREPROD_LOCAL ) )
		DatGUI.init();
};


module.exports = new Debug();

