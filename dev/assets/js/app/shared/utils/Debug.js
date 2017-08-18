'use strict';


var Config		= require( 'shared/configs/Config' );
var FPSStats	= require( 'shared/utils/FPSStats' );
var MemoryStats	= require( 'shared/utils/MemoryStats' );
var DatGUI		= require( 'shared/utils/DatGUI' );



function Debug() {
	this.fpsStats		= null;
	this.memoryStats	= null;
	this.datGui			= null;
}


Debug.prototype.init = function( isInitFPSStats, isInitMemoryStats, isInitDatGUI ) {
	_initFPSStats.call( this, isInitFPSStats );
	_initMemoryStats.call( this, isInitMemoryStats );
	_initDatGUI.call( this, isInitDatGUI );
};


var _initFPSStats = function( isSet ) {
	Config.setFPSStats( isSet );
	
	if ( isSet && ( Config.IS_DEV || Config.IS_PREPROD_LOCAL ) ) {
		this.fpsStats = new FPSStats();
		this.fpsStats.init();
	}
};


var _initMemoryStats = function( isSet ) {
	Config.setMemoryStats( isSet );
	
	if ( isSet && ( Config.IS_DEV || Config.IS_PREPROD_LOCAL ) ) {
		this.memoryStats = new MemoryStats();
		this.memoryStats.init();
	}
};


var _initDatGUI = function( isSet ) {
	if ( isSet && ( Config.IS_DEV || Config.IS_PREPROD_LOCAL ) ) {
		this.datGui = new DatGUI();
		this.datGui.init();
	}
};


module.exports = new Debug();

