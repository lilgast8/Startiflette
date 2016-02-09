'use strict';

var path = require('path');
var BinWrapper = require('bin-wrapper');
var pkg = require('../package.json');
var url = 'https://raw.github.com/imagemin/advpng-bin/v' + pkg.version + '/vendor/';

module.exports = new BinWrapper()
	.src(url + 'osx/advpng', 'darwin')
	.src(url + 'linux/advpng', 'linux')
	.src(url + 'win32/advpng.exe', 'win32')
	.dest(path.join(__dirname, '../vendor'))
	.use(process.platform === 'win32' ? 'advpng.exe' : 'advpng');
