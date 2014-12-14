<!DOCTYPE html>
<html dir="ltr" lang="<?php echo LG; ?>" class="no-js">
<head>
	<meta charset="utf-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge, chrome=1" />
	
	<title><?php echo $titlePage; ?></title>
	<meta name="description" content="<?php echo $descPage; ?>" />
	<meta name="keywords" content="" />
	<meta name="robots" content="index, follow" />
	<meta name="author" content="Gaston Bouchayer" />
	<meta name="designer" content="Gaston Bouchayer" />
	<meta name="format-detection" content="telephone=no">
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<?php
	if(Config::$MULTI_LANG)
		$main->routes->getAltLink();
	
	/* Social share */
	include_once $main->path->file->base.'php/shared/social-share.php';
	
	/* Favicons */
	include_once $main->path->file->base.'php/shared/favicons.php';
	
	?>
	
	<link media="screen" rel="stylesheet" type="text/css" href="<?php echo $main->path->url->css; ?>styles-desktop.min.css" />
	
	<?php
	if(!Config::PROD) {
		$jsonJsFiles = file_get_contents($main->path->file->js.'js-files.json');
		$jsFiles = json_decode($jsonJsFiles, true);
		
		$files = $jsFiles['modern-detect-izr']['files'];
		
		for($i=0; $i<count($files); $i++)
			echo '<script src="' . $main->path->url->js . $files[$i] . '"></script>' . "\n";
	} else { ?>
	<script src="<?php echo $main->path->url->js; ?>lib/modern-detect-izr.min.js"></script>
	<?php }
	
	/* Google Analytics */
	include_once $main->path->file->base.'php/shared/google-analytics.php';
	
	?>
</head>

<body>


<!-- Main container -->
<div id="main-container" class="preload">
	
	<!-- Loader -->
	<div id="loader">
		
	</div>
	
	<!-- Header -->
	<header id="header">
		<!-- Menu -->
		<nav id="menu">
			<ul>
				<li>
					<a href="<?php echo $aUrl->home; ?>" class="menu-link" data-url="<?php echo $aUrl->homeId; ?>">Accueil</a>
				</li>
				<li>
					<a href="<?php echo $aUrl->about; ?>" class="menu-link" data-url="<?php echo $aUrl->aboutId; ?>">À propos</a>
				</li>
				<li>
					<a href="<?php echo $aUrl->projects; ?>" class="menu-link" data-url="<?php echo $aUrl->projectsId; ?>">Projets</a>
				</li>
			</ul>
		</nav>
	</header>
	
	<!-- Page container -->
	<div id="page-container">
		