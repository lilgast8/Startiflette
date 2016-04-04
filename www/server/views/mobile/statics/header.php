<!DOCTYPE html>
<html dir="ltr" lang="<?php echo Lang::$LANG; ?>" class="no-js">
<head>
	<meta charset="utf-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge, chrome=1" />
	
	<title><?php echo PagesController::$PAGE_INFOS->title; ?></title>
	<meta name="description" content="<?php echo PagesController::$PAGE_INFOS->desc; ?>" />
	<meta name="keywords" content="" />
	<meta name="robots" content="index, follow" />
	<meta name="author" content="Gaston Bouchayer" />
	<meta name="designer" content="Gaston Bouchayer" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<?php
	
	echo $this->path->getAltLangUrlMeta();
	
	/* Social share */
	include_once Path::$FILE->shared . 'social-share.php';
	
	/* Favicons */
	include_once Path::$FILE->shared . 'favicons.php';
	
	?>
	
	<link media="screen" rel="stylesheet" type="text/css" href="<?php echo Path::$URL->css; ?>styles-mobile.min.css" />
	
	<?php
	
	/* Modernirz & Detectizr */
	echo $this->path->getJsFilesUrl( 'header' );
	
	/* Google Analytics */
	include_once Path::$FILE->shared . 'google-analytics.php';
	
	?>
</head>

<body>


<?php // include_once Path::$FILE->shared . 'svg.php'; // SVG ?>


<!-- Main container -->
<div id="main-container" class="preload">
	
	<!-- Loader -->
	<div id="main-loader" class="init">
		
	</div>
	
	<!-- Header -->
	<header id="header">
		<!-- Menu -->
		<nav id="menu">
			<ul>
				<li>
					<a href="<?php echo Router::$LINK->statics->home; ?>" class="menu-link">
						<?php echo Contents::$datas->partial->menu->home; ?>
					</a>
				</li>
				<li>
					<a href="<?php echo Router::$LINK->statics->about; ?>" class="menu-link">
						<?php echo Contents::$datas->partial->menu->about; ?>
					</a>
				</li>
				<li>
					<a href="<?php echo Router::$LINK->statics->projects; ?>" class="menu-link">
						<?php echo Contents::$datas->partial->menu->projects; ?>
					</a>
				</li>
			</ul>
		</nav>
	</header>
	
	<!-- Page container -->
	<div id="page-container">
		