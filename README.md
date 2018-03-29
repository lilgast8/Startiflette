# Startiflette
Starter + tartiflette = Startiflette, a SEO friendly starter for HTML5 + JS app with a Savoyard touch.



## Dependencies

Here are the dependencies you need to install globally before starting:

* [Node](https://nodejs.org)
* [Gulp](http://gulpjs.com)
* [Composer](https://getcomposer.org)
* [SASS](http://sass-lang.com)



## Starting

1. Install NPM packages to the project root: `npm install`
2. Install composer packages to the `dev/server` directory: `composer install`
3. Set up your config environment in `dev/configs/config.json`
4. Run init gulp task: `gulp init`



## Environments

There are 4 default environments:

* `dev`: used for development, the targeted directory is `dev/`.
* `preprod-local`: used to test prod version in local, the targeted directory is `www/`.
* `preprod`: used to test prod version online, the targeted directory is `www/`.
* `prod`: used for production, the targeted directory is `www/`.

You can add as many environments as you want.



## Gulp

Some tasks depend on the environment.
The default environment is `prod` for all tasks except for `init` & `default` for which is the default environment `dev`.
You can force a specific environment by adding a flag before the gulp task name `gulp TASK_NAME --env=ENV_NAME`, except for `init` & `default` tasks.

The 3 main tasks (you can find them in `gulpfile.js`) are:

* `init`: First task you need to execute, executes `htaccess` & `rename-js-app`.
* `default`: Executes `watch`, used for development.
* `prod`: Executes `delete` which deletes the `www/` directory then re-created it. Then executes `robots`, `sass`, `js`, `json`, `svg` & `image`. And finally executes `move` which moves all the rest of files in `www/`.
* `prod-htmlify`: Excecutes `delete` which deletes the `www/` directory then re-created it. Then executes `sass`, `js`, `json`, `svg` & `image`. And finally executes `move` which moves all the rest of files in `www/` and `htmlify`.


If, for some reasons, you need or want to execute a task separately, here is the complete list of tasks you can directly call:

* `deploy`, `favicons`, `files`, `htaccess`, `image`, `image-move`, `image-min`, `js`, `js-concat`, `js-hint`, `js-min`, `json`, `json-min`, `json-lint`, `new-view`, `rename-js-app`, `robots`, `sass`, `server`, `set-env`, `sounds`, `svg` & `videos`


Complete list of gulp tasks & what they do:

* `default`: Manage all the development tasks.
* `delete`: Deletes files depending to the executed task.
* `deploy`: Put online the project, [more infos](#uses-and-config-deploy-gulp-task).
* `favicons`: Generates all type of favicons.
* `files`: Removes all files in `www/files/` & moves all files from `dev/files/` to `www/files/`.
* `htaccess`: Sets the htaccess.
* `htmlify`: Called by `prod-htmlify` to generate HTML static files for each view according to existing routes.
* `image`: Executes `image-min` or `image-move` depending on `image.min` option in `utils/image.js` file, [more infos](#config-image-gulp-task).
* `image-min`: Minifies images in `www/img/`. If directly called, `delete` which deletes all images in `www/img/` is executed before. You can manage compression independently for each files, [more infos](#config-image-gulp-task).
* `image-move`: Moves images in `www/img/`. If directly called, `delete` which deletes all images in `www/img/` is executed before.
* `init`: Sets the basic configuration by calling `htaccess`& `rename-js-app`;
* `js`: If called by `watch`, this will execute `js-hint` then `js-concat`. Else this will execute `js-hint` then `js-min`.
* `js-concat`: Concatenates JS files in `assets/js` depending on `js-files.json` configurations. If directly called, `delete` which deletes all JS files in the root of `assets/js` is executed.
* `js-hint`: Checks the potential errors & problems in JSON files.
* `js-min`: Concatenates & minifies JS files from `assets/js/` to `www/js`. If directly called, `delete` which deletes JS files in `www/js/` & `set-uid` which generate a new unique JS id are executed before.
* `json`: If called by `watch`, this will only execute `js-lint` except if that's `config.json` which is modified, then it will execute `htaccess`. Else this will execute `json-lint` then `json-min`.
* `json-lint`: Checks the potential errors & problems in JSON files.
* `json-min`: Minifies all JSON files (`assets/json/` & `configs/`) from `dev/` to `www/` then execute `set-env`. If directly called, `delete` which deletes all JSON files (`assets/json/` & `configs/`) in `www/` is executed before.
* `move`: Moves files depending to the executed task.
* `new-view`: Creates all the necessary files (CSS, Twig, content, PHP controller & JS) for a new view template. The device folder by default is `desktop`. You can define a specific device by using the following flag `--device=DEVICE_NAME`. Even so you need to add by hand the route in `configs/routes/statics.json` & the JS view connection in the `PagesController.pages` object.
* `prod`: Manage all the production tasks, then the project is ready for production.
* `prod-htmlify`: Manage all the production tasks like `prod`, but the difference is that it will generate a HTML static version of your project.
* `rename-js-app`: Gives you the possibility to rename the JS app. Must be a sequence of simple letter (no special characters, numbers or spaces).
* `robots`: Sets the `robots.txt` file in `www/`;
* `sass`: Compiles SCSS files to CSS. If directly called, `delete` which deletes all CSS files & `set-uid` which generate a new unique CSS id are executed before then compiled files are renamed & moved to `www/css/`.
* `server`: Removes all files in `www/server/` & moves all files from `dev/server/` to `www/server/`.
* `set-env`: Executes `htaccess` then sets the environment on `config.json`.
* `set-uid`: Generate a unique id for CSS & JS compiled files, which is used to avoid cache when a new version of these ones are put online.
* `sounds`: Removes all sounds files in `www/sounds/` & moves all sounds files from `dev/sounds/` to `www/sounds/`.
* `svg`: Compiles SVG files to SVG sprite. If directly called, `delete` which deletes all SVG sprites is executed before then SVG sprite is also moved to `www/assets/svg/_sprite/`.
* `videos`: Removes all sounds files in `www/videos/` & moves all videos files from `dev/videos/` to `www/videos/`.
* `watch`: This is the default dev task. It watches all files, run the associated tasks (`htaccess`, `sass`, `favicons`, `js`, `json` or `svg`) & livereload when a file is updated.


### Config CSS supports for `sass` gulp task

The `sass` gulp task have options to manage css supports which can be updated in `gulp/utils/css-supports.js` file.

* `cssSupports`: @type {object} List of parameters which will define CSS supports, using [Browserslist library](https://github.com/ai/browserslist). See [Browserslist docs](https://github.com/ai/browserslist#queries) for available queries and default value.


### Config `image` gulp task

The `image` gulp task allows you to compress the images from the `img/` directory. Make the configurations in `gulp/utils/image.js` file.

* `min`: @type {boolean} `true` Enable/disable compression.
* `params`: @type {array of object} Each object contains the following parameters:
	* `src`: @type {array} List of paths you want to target or exclude.
	* `dest`: @type {string} `null` Path of the destination directory. Useful if you targeted only files in the `src` parameter but if you targeted a directory you can set it to `null`.
	* `quality`: @type {object}
		* `min`: @type {int} Minimum quality, value between 0-100.
		* `max`: @type {int} Maximum quality, value between 0-100.


### Uses and config `deploy` gulp task

The `deploy` gulp task is used to put your project online. Make the configurations in `gulp/utils/server.js` file. For more information have a look to the [vinly-ftp](https://www.npmjs.com/package/vinyl-ftp) documentation.

* `config`: @type {object} Configuration to connect to the FTP.
* `src`: @type {array} List of targeted sources.
* `base`: @type {string} Path of the local targeted directory.
* `dest`: @type {string} Path of the destination targeted directory.

You can use the flag `--remove` if you want to completely delete the online directory before the upload.



## Config
Make the configurations in the `dev/configs/config.json` file.

* `ENV`: @type {string}
* `ENVS`: @type {object} Containt `fallbackresource`, `base_url` & `base_url_cms`.
* `ALL_LANG`: @type {array of string} List of languages, the first one will be the default language.
* `GENERATE_JS_VIEW_ID`: @type {array} List of targeted version, used to manage several hide/show transitions for a view, can be `"desktop"` and/or `"mobile"`, [more infos](#manage-complex-transitions).
* `HAS_MOBILE_VERSION`: @type {boolean} `true`
* `TABLET_VERSION`: @type {string} Targeted version displayed for tablet, can be `"desktop"`, `"mobile"` or `""`.
* `FORCE_DEVICE`: @type {boolean or string} `false` Can be `false`, `"desktop"`, `"tablet"` or `"mobile"`.
* `GA_ID`: @type {object} `"trackerName": "gaID"` Tracker name to use by default is `"default"`.
* `CREDITS`: @type {object} Used to show credits console.



## Routes

* `home` have to be defined. It's the default route that every project must have.
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
	
	* `params`: @type {array} Optional option. List of dynamic parameters used when you have a dynamic page which needs to get data via an API. To use it you need to extend the `AbstractViewController` class, override the `callAPI()` method and make your API call from it. The API response have to be saved in `$this->response` and must contain the 3 following parameters:
		* `$this->response->pageExist`: @type {boolean} Show the page view if `true`, else set & show the 404 page.
		* `$this->response->urls`: @type {object} List of the page urls for each language.
		* `$this->response->data`: @type {data} All the data you need in the page view.



## Custom events

You can create and manage custom events in any inherited class from CustomEvent class. [CustomEvent.js](https://github.com/LilGast8/Startiflette/blob/master/dev/assets/js/app/shared/events/CustomEvent.js) depend on [`js-signal`](http://millermedeiros.github.io/js-signals).

First of all, set the list of event(s) in `this.E` of the object which will be listened:

```
this.E = {
	RESIZE:	'resize',
	RAF:	'raf'
}
```

Then use the following methods to manage a custom event:

* `LISTENED_OBJECT.bind( LISTENED_OBJECT.E.EVENT, FUNCTION, CONTEXT )` Bind an event to the listened object.
* `LISTENED_OBJECT.unbind( LISTENED_OBJECT.E.EVENT, FUNCTION, CONTEXT )` Unbind an event from the listened object.
* `this.dispatch( this.E.EVENT )` Dispatch an event from the listened object.



## Assets loading

Define the list of assets you want to load in `Assets.js`. The `aImg` and `aJson` objects are respectively used for images and JSON files. These objects contain a list of arrays with a key. This key is the id of the page you previously defined in `routes.json`. In this way we can load the images according to the page on which the user is. The `global` id is used for assets which need to be loaded just once, at start. Basically the assets which don't depend on a specific page.

There are 3 types of images loading. You can set the mode you want in `AbstractPagesController.js` or `PagesController.js` with `LOADING_MODE` variable. Here is the 3 options:

* `allStatic`: It load all the assets defined in `Assets.js` at the start, then no loading on page change.
* `byPageStatic`: At the start it load the assets in `global` and the assets of the page `page_id` defined in `Assets.js`. On page change only the assets of the page `page_id` are loaded.
* `byPageDynamic`: Same behaviour than `byPageStatic` but it also parse the DOM to find images defined by `DYNAMIC_IMG_TO_LOAD` and preload them, except these which have the following data-value `data-lazyload="true"` ([see lazyloading management below](#lazyloading)). At the start it parse all the DOM but on page change it only parse the page container `#page-container`.



## Lazyloading

A lazyloader `this.lazyloader = new STF.LazyLoader( this.$page, this.imgToLazyloadClassName, this.lazyloadParentEl, 1, true )` is already created by default for each page view. You can manage or update it according to your needs in `AbstractPageView.js`.

You need to add `data-lazyload="true"` on the image `<img>` tag you want to lazyload. By using it you prevent to add the image on the main loader when `LOADING_MODE = 'byPageDynamic'`.

To create a new lazyloader use: `new STF.LazyLoader( $container, className, parentEl, stackSize, autoInit )`

* `$container`: container parsed to find the images to lazyload
* `className`: class name of images to lazyload
* `parentEl`: selector of parent of images to lazyload
* `stackSize`: number of images to load on each loading wave
* `autoInit`: `true` if the loader initializes itself when it's created or `false` if we need to manually initialize it after

The lazyloader created by default needs these two following variables: `imgToLazyloadClassName` & `lazyloadParentEl`. You can custom them where the lazyloader was created or in the class of your page.

Once your image loaded, the `loaded` class name is added to the parent element defined in `lazyloadParentEl`. If `lazyloadParentEl === null`, nothing happens.

Once all images loaded, the `onLazyloadCompleted` function is fired. You can do any actions you want in this function.



## Manage complex transitions

Sometimes you need to have several hide or show transitions for a view depending on what the next or previous view is. To do that you need to get the id of both views (next & previous) instantly when the url change. That's why we need an array who linked the urls with the js view id.

This array is automatically generated from the `routes.json` file in the `Router.php` file and stocked in `JS_VIEWS_ID` in `Config.js` file. But if you have dynamic pages (therefore dynamic routes) they can't be guessed so you need to generate and save them in `dev/configs/dynamic-sub-path/` directory. You must generate one file per view, its name must be the view id and it must contain the list of sub-paths.

Here is a example:	
* You have the following route in your `route.json` file:

```
"example": {
	"url-page": {
		"fr": "example-path-fr",
		"en": "example-path-en",
		"ex": "example-path-ex"
	},
	"params": [ "param1", "param2", "param3" ]
}
```

* Your dynamic sub-path file will look like this ([see the `example.json`](https://github.com/LilGast8/Startiflette/tree/master/dev/configs/dynamic-sub-path/example.json))

Once the array stocked in `JS_VIEWS_ID`, it will be used to set the `pageInfos.id` & `prevPageInfos.id` in `AbstractPagesController.js`. Then these ids can be used to make conditions and launch the specific hide/show transition you want.