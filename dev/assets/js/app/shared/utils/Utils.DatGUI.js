

APP.Utils = APP.Utils || {};


APP.Utils.DatGUI = (function(window){
	
	
	function DatGUI() {
		this.gui = null;
		
		this.v = {};
		
		this.v.var1 = 'message';
		this.v.var2 = 23;
		this.v.var3 = null;
		this.v.var4 = false;
		this.v.var5 = '#fe7272';
	}
	
	
	DatGUI.prototype.init = function() {
		this.gui = new dat.GUI({
			width : 300
		});
		
		var text		= this.gui.add(APP.Utils.DatGUI.v, 'var1', 10, 100).name('TEXT');
		var slider		= this.gui.add(APP.Utils.DatGUI.v, 'var2', 10, 100).step(1).name('SLIDER');
		var select		= this.gui.add(APP.Utils.DatGUI.v, 'var3', ['option 1', 'option 2', 'option 3']).name('SELECT');
		var checkBox	= this.gui.add(APP.Utils.DatGUI.v, 'var4').name('CHECKBOX');
		var color		= this.gui.addColor(APP.Utils.DatGUI.v, 'var5').name('COLOR');
		this.gui.add(APP.Utils.DatGUI, '_function').name('FUNCTION');
		
		text.onChange( _changeText.bind(this) );
		slider.onChange( _changeSlider.bind(this) );
		slider.onFinishChange( _finishChangeSlider.bind(this) );
		select.onChange( _changeSelect.bind(this) );
		checkBox.onChange( _changeCheckbox.bind(this) );
		color.onChange( _changeColor.bind(this) );
		
		
		// this.test = this.gui.__controllers[1];
	};
	
	
	var _changeText = function(v) {
		console.log('_changeText :', v);
	};
	
	
	var _changeSlider = function(v) {
		console.log('_changeSlider :', v);
	};
	
	
	var _finishChangeSlider = function(v) {
		console.log('_finishChangeSlider :', v);
	};
	
	
	var _changeSelect = function(v) {
		console.log('_changeSelect :', v);
	};
	
	
	var _changeCheckbox = function(v) {
		console.log('_changeCheckbox :', v);
	};
	
	
	var _changeColor = function(v) {
		console.log('_changeColor :', v);
	};
	
	
	DatGUI.prototype._function = function() {
		console.log('_function');
	};
	
	
	return new DatGUI();
	
	
})(window);

