<!DOCTYPE html>
<!--[if lt IE 7]>	<html dir="ltr" lang="<?php echo Lang::$LANG; ?>" class="no-js ie6 lt-ie7 lt-ie8 lt-ie9 lt-ie10"> <![endif]-->
<!--[if IE 7]>		<html dir="ltr" lang="<?php echo Lang::$LANG; ?>" class="no-js ie7 lt-ie8 lt-ie9 lt-ie10"> <![endif]-->
<!--[if IE 8]>		<html dir="ltr" lang="<?php echo Lang::$LANG; ?>" class="no-js ie8 lt-ie9 lt-ie10"> <![endif]-->
<!--[if IE 9]>		<html dir="ltr" lang="<?php echo Lang::$LANG; ?>" class="no-js ie9 lt-ie10"> <![endif]-->
<!--[if (gte IE 9) | !(IE)]><!--><html dir="ltr" lang="<?php echo Lang::$LANG; ?>" class="no-js"> <!--<![endif]-->
<head>
	<meta charset="utf-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge, chrome=1" />
	
	<title><?php echo RoutesController::$TITLE; ?></title>
	<meta name="description" content="<?php echo RoutesController::$DESC; ?>" />
	<meta name="keywords" content="" />
	<meta name="robots" content="index, follow" />
	<meta name="author" content="Gaston Bouchayer" />
	<meta name="designer" content="Gaston Bouchayer" />
	<meta name="format-detection" content="telephone=no">
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<?php
	if(Lang::$MULTI_LANG)
		echo $main->routes->getAltLangUrl();
	
	/* Social share */
	// include_once $main->path->file->base . 'server/shared/social-share.php';
	
	/* Favicons */
	// include_once $main->path->file->base . 'server/shared/favicons.php';
	
	?>
	
	<link media="screen" rel="stylesheet" type="text/css" href="<?php echo Path::$URL->css; ?>styles-desktop.min.css" />
	
	<!--[if lt IE 9]><script src="<?php echo Path::$URL->js; ?>vendors/html5shiv.min.js"></script><![endif]-->
	<?php
	
	/* Modernirz & Detectizr */
	// echo $main->config->listJsFiles('modern-detect-izr');
	
	/* Google Analytics */
	// include_once $main->path->file->base . 'server/shared/google-analytics.php';
	
	?>
</head>

<body>


<!-- Main container -->
<div id="main-container" class="preload">
	
	<!-- Loader -->
	<div id="loader">
		<div class="loader-progress"></div>
	</div>
	
	<!-- Header -->
	<header id="header">
		<!-- Menu -->
		<nav id="menu">
			<ul>
				<li>
					<a href="<?php echo Path::$LINK->static->home; ?>" class="menu-link" data-url="<?php // echo $main->routes->url->home_ID; ?>">
						<?php // echo $main->contents->global->menu->home; ?>
					</a>
				</li>
				<li>
					<a href="<?php echo Path::$LINK->static->about; ?>" class="menu-link" data-url="<?php // echo $main->routes->url->about_ID; ?>">
						<?php // echo $main->contents->global->menu->about; ?>
					</a>
				</li>
				<li>
					<a href="<?php echo Path::$LINK->static->projects; ?>" class="menu-link" data-url="<?php // echo $main->routes->url->projects_ID; ?>">
						<?php // echo $main->contents->global->menu->projects; ?>
					</a>
				</li>
			</ul>
		</nav>
	</header>
	
	<!-- Page container -->
	<div id="page-container">
		