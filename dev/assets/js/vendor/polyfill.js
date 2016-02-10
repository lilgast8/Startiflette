


/* Object.create */


// https://github.com/Danetag/js-project/blob/master/root/app/js/libIE/polyfill.js
if (!Object.create) {
	Object.create = (function(){
		function F(){}

		return function(o){
			if (arguments.length != 1) {
				throw new Error('Object.create implementation only accepts one parameter.');
			}
			F.prototype = o;
			return new F()
		}
	})()
};



// https://gist.github.com/lavoiesl/6642066
if (typeof Object.create !== 'function') {
	Object.create = function(o, props) {
		function F() {}
		F.prototype = o;
		
		if (typeof(props) === "object") {
			for (prop in props) {
				if (props.hasOwnProperty((prop))) {
					F[prop] = props[prop];
				}
			}
		}
		return new F();
	};
}



// http://stackoverflow.com/questions/18020265/object-create-not-supported-in-ie8
if (!Object.create) {
	Object.create = function(o, properties) {
		if (typeof o !== 'object' && typeof o !== 'function') throw new TypeError('Object prototype may only be an Object: ' + o);
		else if (o === null) throw new Error("This browser's implementation of Object.create is a shim and doesn't support 'null' as the first argument.");
		
		if (typeof properties != 'undefined') throw new Error("This browser's implementation of Object.create is a shim and doesn't support a second argument.");
		
		function F() {}
		
		F.prototype = o;
		
		return new F();
	};
}



// https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Object/create
if (typeof Object.create != 'function') {
	
	Object.create = (function() {
		// To save on memory, use a shared constructor
		function Temp() {}
		
		// make a safe reference to Object.prototype.hasOwnProperty
		var hasOwn = Object.prototype.hasOwnProperty;
		
		return function (O) {
			if (typeof O != 'object') {
				throw TypeError('Object prototype may only be an Object or null');
			}
		  	
			Temp.prototype = O;
			var obj = new Temp();
			Temp.prototype = null; // Let's not keep a stray reference to O...
			
			if (arguments.length > 1) {
				var Properties = Object(arguments[1]);
				for (var prop in Properties) {
					if (hasOwn.call(Properties, prop)) {
						obj[prop] = Properties[prop];
					}
				}
			}
			
			return obj;
		};
	})();
	
}
