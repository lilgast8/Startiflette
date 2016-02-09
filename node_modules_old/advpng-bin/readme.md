# advpng-bin [![Build Status](http://img.shields.io/travis/imagemin/advpng-bin.svg?style=flat)](https://travis-ci.org/imagemin/advpng-bin)

> The main purpose of this utility is to recompress png files to get the smallest 
possible size


## Install

```
$ npm install --save advpng-bin
```


## Usage

```js
var execFile = require('child_process').execFile;
var advpng = require('advpng-bin');

execFile(advpng, ['--recompress', '--shrink-extra', 'image.png'], function (err) {
	console.log('Image minified!');
});
```


## CLI

```
$ npm install --global advpng-bin
```

```
$ advpng --help
```


## License

MIT © [imagemin](https://github.com/imagemin)
