# Startiflette
Starter + tartiflette = Startiflette, a SEO friendly starter for HTML5 + JS app with a Savoyard touch.



## Dependencies

Here are the dependencies you need to install globally before starting:

* [Node](https://nodejs.org)
* [Gulp](http://gulpjs.com)
* [Composer](https://getcomposer.org)
* [Ruby](https://www.ruby-lang.org)
* [GEM](https://rubygems.org)
* [SASS](http://sass-lang.com)
* [Compass](http://compass-style.org)



## Starting

1. Install NPM packages to the project root: `npm install`
2. Install composer packages to the `dev/server` directory: `composer install`
3. Set up your config environment in `dev/configs/config.json`
4. Run init gulp task: `gulp init`



## Environments

There are 4 default environments:

* `dev`: used for development, the targeted directory is `dev/`.
* `preprod-local`: used to test prod in local, the targeted directory is `www/`.
* `preprod`: used to test prod online, the targeted directory is `www/`.
* `prod`: used for production, the targeted directory is `www/`.

You can add as many environment as you want for development.



## Gulp

Some tasks depend on the environment.
The default environment is `prod` for all tasks except for `init` & `default` for which is the default environment `dev`.
You can force a specific environment by adding a flag before the gulp task name `gulp TASK_NAME --env=ENV_NAME`.

The 3 main tasks (you can find them in `gulpfile.js`) are:

* `init`: First task you need to execute, executes `htaccess` & `rename-js-app`. Don't forget to specify the environment if you use a customized environment.
* `default`: Executes `watch`, used for development.
* `prod`: Executes `delete` which deletes the `www/` directory then re-created it. Then executes `robots`, `sass`, `js`, `json`, `svg` & `image`. And finally executes `move` which moves all the rest of files in `www/`.


If, for some reasons, you need or want to execute a task separately, here is the complete list of tasks you can:

* `favicons`
* `files`
* `htaccess`
* `image`
* `image-move`
* `image-min`
* `js`
* `js-min`
* `js-hint`
* `json`
* `json-min`
* `json-lint`
* `new-view`
* `rename-js-app`
* `robots`
* `sass`
* `server`
* `set-env`
* `sounds`
* `svg`
* `videos`


Complete list of gulp tasks & what they do:

* `delete`: Deletes files depending to the executed task.
* `favicons`: 
* `files`: Removes all files in `www/files/` & moves all sounds files from `dev/files/` to `www/files/`.
* `htaccess`: Sets the htaccess.
* `image`: Executes `image-min` or `image-move` depending on `options.imageMin`
* `image-min`: Minifies images in `www/img/`. If directly called, `delete` which deletes all images in `www/img/` is executed before.
* `image-move`: Moves images in `www/img/`. If directly called, `delete` which deletes all images in `www/img/` is executed before.
* `js`: If called by `watch`, this will only execute `js-hint`. Else this will execute `js-hint` then `js-min`.
* `js-hint`: Checks the potential errors & problems in JSON files.
* `js-min`: Concats & minifies JS files from `assets/js/` to `www/js`. If directly called, `delete` which deletes JS files in `www/js/` is executed before then `html5shiv.min.js` file is also moved to `www/js/vendor/`.
* `json`: If called by `watch`, this will only execute `js-lint` except if that's `config.json` which is modified, then it will execute `htaccess`. Else this will execute `json-lint` then `json-min`.
* `json-lint`: Checks the potential errors & problems in JSON files.
* `json-min`: Minifies all JSON files (`assets/json/` & `configs/`) from `dev/` to `www/` then execute `set-env`. If directly called, `delete` which deletes all JSON files (`assets/json/` & `configs/`) in `www/` is executed before.
* `move`: Moves files depending to the executed task.
* `new-view`: Creates all the necessary files (CSS, Twig, content, PHP controller & JS) for a new view template. The device folder by default is `desktop`. You can define a specific device by using the following flag `--device=DEVICE_NAME`. Even so you need to add by hand the route in `configs/routes/statics.json` & the JS view connection in the `PagesController.pages` object.
* `rename-js-app`: Gives you the possibility to rename the JS app. Must be a sequence of simple letter (no special characters, numbers or spaces).
* `robots`: Sets the `robots.txt` file in `www/`;
* `sass`: Compiles SCSS files to CSS. If directly called, `delete` which deletes all CSS files is executed before then compiled files are moved to `www/css/`.
* `server`: Removes all files in `www/server/` & moves all files from `dev/server/` to `www/server/`.
* `set-env`: Executes `htaccess` then sets the environment on `config.json`.
* `sounds`: Removes all sounds files in `www/sounds/` & moves all sounds files from `dev/sounds/` to `www/sounds/`.
* `svg`: Compiles SVG files to SVG sprite. If directly called, `delete` which deletes all SVG sprites is executed before then SVG sprite is also moved to `www/assets/svg/_sprite/`.
* `videos`: Removes all sounds files in `www/videos/` & moves all videos files from `dev/videos/` to `www/videos/`.
* `watch`: This is the dev task. It watches all files, run the associated tasks (`sass`, `js`, `json` or `svg`) & livereload when a file us updated.



## Config
Made the configurations in the `dev/configs/config.json` file.

* ENV: @type {string}
* ENVS: @type {object}, containt `fallbackresource`, `base_url` & `base_url_cms`
* ALL_LANG: @type {array of string} list of languages, the first one will be the default language
* HAS_MOBILE_VERSION: @type {boolean}
* FORCE_DEVICE: @type {boolean or string} can be false, "desktop", "tablet" or "mobile"
* GA_ID: @type {object} `"trackerName": "gaID"`, default tracker name is "null"
* CREDITS: @type {object} used to show credits console



## Routes

* `error-404` & `home` have to be defined. They are the default routes that every project must have.
* Each route is defined by a key which is the page id. The object can contain the following parameters:
	* `url-page`: @type {object} List of the page urls for each languages.
	* `js`: @type {string} Optional option, can be used to override the JS view id.
	* `twig`: @type {string} Optional option, can be used to override the Twig view id.
	* `ctrl`: @type {string} Optional option, can be used to override the Controller view id.
	* `device`: @type {object} Optional option. Can be used if you need to make unavailable a page on a specific device. For example, `"device": { "mobile": false }` will make the page unavailable on mobile and show the `not-available` template instead. You can personalize this template like any other page (css, JS, content).
	* `subs`: @type {object of objects} Optional option. Can be used if you need to create sub-routes of a page. All options (`js`, `twig`, `ctrl`, `device`) are available & work like his parent. Note that `url-alias` is used instead of `url-page`.
	Ex:
	
	```
	"my-sub-1": {
		"url-alias": {
			"fr": "sous-route-1",
			"en": "sub-route-1",
			"ex": "sub-route-ex-1"
		}
	}
	```



## Lazyloading

To create a new lazyloader use: `new STF.LazyLoader( $container, className, stackSize )`

You need to add `data-lazyload="true"` on the image `<img>` tag you want to lazyload. By using it you prevent to add the image on the main loader when the `LOADING_MODE = 'byPageDynamic'`.