'use strict';

var BinBuild = require('bin-build');
var log = require('logalot');
var bin = require('./');

bin.run(['--version'], function (err) {
	if (err) {
		log.warn(err.message);
		log.warn('advpng pre-build test failed');
		log.info('compiling from source');

		var builder = new BinBuild()
			.src('http://prdownloads.sourceforge.net/advancemame/advancecomp-1.19.tar.gz')
			.cmd('autoreconf -fiv')
			.cmd('./configure --prefix="' + bin.dest() + '" --bindir="' + bin.dest() + '"')
			.cmd('make install');

		return builder.run(function (err) {
			if (err) {
				log.error(err.stack);
				return;
			}

			log.success('advpng built successfully');
		});
	}

	log.success('advpng pre-build test passed successfully');
});
