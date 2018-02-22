

STF.Utils.Debug.DatGUI = new class DatGUI {
	
	
	constructor() {
		this.gui	= null;
		
		this.var1	= 'message';
		this.var2	= 23;
		this.var3	= null;
		this.var4	= false;
		this.var5	= '#fe7373';
	}
	
	
	init() {
		this.gui = new dat.GUI( {
			width : 300
		} );
		
		const text		= this.gui.add( this, 'var1', 10, 100 ).name( 'Text' );
		const slider	= this.gui.add( this, 'var2', 10, 100 ).step(1).name( 'Slider' );
		const select	= this.gui.add( this, 'var3', [ 'option 1', 'option 2', 'option 3' ] ).name( 'Select' );
		const checkBox	= this.gui.add( this, 'var4' ).name( 'Checkbox' );
		const color		= this.gui.addColor( this, 'var5').name( 'Color' );
		this.gui.add( this, '_fct' ).name( 'Function' );
		
		text.onChange( this._changeText );
		slider.onChange( this._changeSlider );
		slider.onFinishChange( this._finishChangeSlider );
		select.onChange( this._changeSelect );
		checkBox.onChange( this._changeCheckbox );
		color.onChange( this._changeColor );
		
		
		// this.test = this.gui.__controllers[1];
	}
	
	
	_changeText( v ) {
		console.log( '_changeText :', v );
	}
	
	
	_changeSlider( v ) {
		console.log( '_changeSlider :', v );
	}
	
	
	_finishChangeSlider( v ) {
		console.log( '_finishChangeSlider :', v );
	}
	
	
	_changeSelect( v ) {
		console.log( '_changeSelect :', v );
	}
	
	
	_changeCheckbox( v ) {
		console.log( '_changeCheckbox :', v );
	}
	
	
	_changeColor( v ) {
		console.log( '_changeColor :', v );
	}
	
	
	_fct() {
		console.log( '_function' );
	}
	
	
}();

