# Startiflette
Starter + tartiflette = Startiflette, a SEO friendly starter for HTML5 + JS app with a Savoyard touch.


##Starting

1. Install gulp: `$ npm install -g gulp`
2. Install NPM dependencies: `$ npm install`
3. Set your config environment in `dev/configs/config/config.json` file
4. Execute init gulp task: `$ gulp init`



## Gulp
List of gulp tasks & what they do:

The 3 main tasks (you can find them in the `gulpfile.js`) are:

* `init`: First task you need to execute, will run `htaccess` & `rename-js-app`.
* `default`: Will run `watch`.
* `prod`: 

And all the other tasks:

* `htaccess`: Set the FallBackRessource.
* `rename-js-app`: Give you the possibility to rename the JS app, must be a sequence of simple letter (no specials characters or spaces).
* `watch`: This is the dev task. It watches all files, run the associated tasks (`sass`, `js`, `json` or `svg`) & livereload when one of them changes.

If, for some reasons, you need or want to execute a task separately, here is the complete list of tasks you can:

* `htaccess`
* `image`
* `image-move`
* `image-min`
* `js`
* `js-min`
* `json`
* `json-min`
* `new-page`
* `rename-js-app`
* `robots`
* `sass`
* `server`
* `set-env`
* `svg`



## Config
Made the configurations in the `dev/configs/config/config.json` file.

* ENV: @type {string} can be "dev", "preprod" or "prod"
* BASE_URL_DEV: @type {string}
* BASE_URL_PREPROD: @type {string}
* BASE_URL_PROD: @type {string}
* BASE_URL_PROD_ALT: @type {string}
* ROUTES_FILES: @type {array of string} list of json files used for routing management
* ALL_LANG: @type {array of string} list of languages, the first one will be the default language
* HAS_LANG_LANDING: @type {boolean}
* HAS_MOBILE_VERSION: @type {boolean}
* FORCE_DEVICE: @type {boolean or string} can be false, "desktop", "tablet" or "mobile"
* HAS_AJAX: @type {boolean}
* GA_ID: @type {array of string} list of Google Analytics ID



## Routes

* error404 & home must be defined *— TO COMPLETE*