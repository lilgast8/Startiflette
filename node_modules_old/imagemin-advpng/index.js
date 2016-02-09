'use strict';

var advpng = require('advpng-bin');
var ExecBuffer = require('exec-buffer');
var isPng = require('is-png');
var through = require('through2');

module.exports = function (opts) {
	opts = opts || {};

	return through.ctor({objectMode: true}, function (file, enc, cb) {
		if (file.isNull()) {
			cb(null, file);
			return;
		}

		if (file.isStream()) {
			cb(new Error('Streaming is not supported'));
			return;
		}

		if (!isPng(file.contents)) {
			cb(null, file);
			return;
		}

		var execBuffer = new ExecBuffer();
		var args = ['--recompress', '-q'];
		var optimizationLevel = opts.optimizationLevel || 3;

		if (typeof optimizationLevel === 'number') {
			args.push('-' + optimizationLevel);
		}

		execBuffer
			.dest(execBuffer.src())
			.use(advpng, args.concat([execBuffer.src()]))
			.run(file.contents, function (err, buf) {
				if (err) {
					err.fileName = file.path;
					cb(err);
					return;
				}

				if (buf.length < file.contents.length) {
					file.contents = buf;
				}

				cb(null, file);
			});
	});
};
