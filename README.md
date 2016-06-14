# Startiflette
Starter + tartiflette = Startiflette, a SEO friendly starter for HTML5 + JS app with a Savoyard touch.


## Starting

1. Install gulp: `$ npm install -g gulp`
2. Install NPM dependencies: `$ npm install`
3. Install composer:
	* for Mac user:
		* `$ curl -sS https://getcomposer.org/installer | php`
		* `mv composer.phar /usr/local/bin/composer`
	* if didn't work or for Windows user: [how to install composer?](https://getcomposer.org/doc/00-intro.md)
4. Install composer dependencies from `dev/server` directory: `$ composer install`
5. Set your config environment in `dev/configs/config/config.json`
6. Execute init gulp task: `$ gulp init`



## Environments

There is 4 environments:

* `dev`: used for development, the targeted directory is `dev/`.
* `preprod-local`: used to test prod in local, the targeted directory is `www/`.
* `preprod`: used to test prod online, the targeted directory is `www/`.
* `prod`: used for production, the targeted directory is `www/`.



## Gulp

Some tasks need the environment.
The default environment is `prod` for all tasks except for `init` & `default` for which is the default environment.
You can force a specific environment by adding a flag before the gulp task name `gulp task --env=ENV_NAME`.

List of gulp tasks & what they do:

* `delete`: Deletes files depending to the executed task.
* `move`: Moves files depending to the executed task.
* `htaccess`: Sets the htaccess.
* `rename-js-app`: Gives you the possibility to rename the JS app. Must be a sequence of simple letter (no special characters, numbers or spaces).
* `watch`: This is the dev task. It watches all files, run the associated tasks (`sass`, `js`, `json` or `svg`) & livereload when a file changes.
* `sass`: Compiles SCSS files to CSS. If directly called, `delete` which deletes all CSS files is executed before then compiled files are moved to `www/`.
* `js`: If called by `watch`, this will only execute `js-hint`. Else this will execute `js-hint` then `js-min`.
* `js-hint`: Checks the potential errors & problems in JSON files.
* `js-min`: Concats & minifies JS files in `www/`. If directly called, `delete` which deletes JS files in `www/` is executed before then html5shiv.min.js file is also moved to `www/`.
* `json`: If called by `watch`, this will only execute `js-lint` except if that's `config.json` which is modified, then it will execute `htaccess`. Else this will execute `json-lint` then `json-min`.
* `json-lint`: Checks the potential errors & problems in JSON files.
* `json-min`: Minifies all JSON files (`assets/json/` & `configs/`) in `www/` then execute `set-env`. If directly called, `delete` which deletes all JSON files in `www/` is executed before.
* `svg`: Compiles SVG files to SVG sprite. If directly called, `delete` which deletes all SVG sprites is executed before then SVG sprite is also moved to `www/`.
* `image`: Executes `image-min` or `image-move` depending on `options.imageMin`
* `image-min`: Minifies images in `www/`. If directly called, `delete` which deletes all images in `www/` is executed before.
* `image-move`: Moves images in `www/`. If directly called, `delete` which deletes all images in `www/` is executed before.
* `server`: Removes all PHP files in `www/` & moves all PHP files from `dev/` to `www/`.
* `sounds`: Removes all sounds files in `www/` & moves all sounds files from `dev/` to `www/`.
* `videos`: Removes all sounds files in `www/` & moves all videos files from `dev/` to `www/`.
* `robots`: Sets the `robots.txt` file in `www/`;
* `new-page`: Creates all the necessary files (CSS, PHP, content & JS) for a new page template. All the same need to add by hand the route in `configs/routes/statics.json`, the content connection in `configs/config/contents.json` & the JS view in `PagesController.js`. *(TODO: automated this)*
* `set-env`: Executes `htaccess` then sets the environment on `config.json`.



The 3 main tasks (you can find them in `gulpfile.js`) are:

* `init`: First task you need to execute, executes `htaccess` & `rename-js-app`.
* `default`: Executes `watch`.
* `prod`: Executes `delete` which deletes the `www/` directory then re-created it. Then executes `robots`, `sass`, `js`, `json`, `svg` & `image`. And finally executes `move` which moves all the rest of files in `www/`.

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

* ENV: @type {string}
* ENVS: @type {object}, containt fallbackresource, base_url & base_url_cms
* ROUTES_FILES: @type {array of string} list of json files used for routing management
* ALL_LANG: @type {array of string} list of languages, the first one will be the default language
* HAS_MOBILE_VERSION: @type {boolean}
* FORCE_DEVICE: @type {boolean or string} can be false, "desktop", "tablet" or "mobile"
* GA_ID: @type {object} "trackerName": "gaID", default tracker name is "null"
* CREDITS: @type {object} used to show credits console



## Routes

* error-404 & home must be defined *— TO COMPLETE*