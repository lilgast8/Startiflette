'use strict';


require( 'zepto' );
require( 'greensock/TweenMax' );

var App = require( 'App' );



function Main() {}



Main.prototype.init = function() {
	var app = new App();
	app.init();
};


var main = new Main();

$( main.init.bind( main ) );


// module.exports = main;

