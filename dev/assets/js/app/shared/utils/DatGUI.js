'use strict';


var dat = require( 'dat.gui' );



function DatGUI() {
	this.gui	= null;
	
	this.var1	= 'message';
	this.var2	= 23;
	this.var3	= null;
	this.var4	= false;
	this.var5	= '#fe7373';
}


DatGUI.prototype.init = function() {
	this.gui = new dat.GUI( {
		width : 300
	} );
	
	var text		= this.gui.add( this, 'var1', 10, 100 ).name( 'Text' );
	var slider		= this.gui.add( this, 'var2', 10, 100 ).step(1).name( 'Slider' );
	var select		= this.gui.add( this, 'var3', [ 'option 1', 'option 2', 'option 3' ] ).name( 'Select' );
	var checkBox	= this.gui.add( this, 'var4' ).name( 'Checkbox' );
	var color		= this.gui.addColor( this, 'var5' ).name( 'Color' );
	this.gui.add( this, '_function' ).name( 'Function' );
	
	text.onChange( _changeText.bind( this ) );
	slider.onChange( _changeSlider.bind( this ) );
	slider.onFinishChange( _finishChangeSlider.bind( this ) );
	select.onChange( _changeSelect.bind( this ) );
	checkBox.onChange( _changeCheckbox.bind( this ) );
	color.onChange( _changeColor.bind( this ) );
	
	
	// this.test = this.gui.__controllers[1];
};


var _changeText = function( v ) {
	console.log( '_changeText :', v );
};


var _changeSlider = function( v ) {
	console.log( '_changeSlider :', v );
};


var _finishChangeSlider = function( v ) {
	console.log( '_finishChangeSlider :', v );
};


var _changeSelect = function( v ) {
	console.log( '_changeSelect :', v );
};


var _changeCheckbox = function( v ) {
	console.log( '_changeCheckbox :', v );
};


var _changeColor = function( v ) {
	console.log( '_changeColor :', v );
};


DatGUI.prototype._function = function() {
	console.log( '_function' );
};


module.exports = DatGUI;

