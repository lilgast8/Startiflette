<!DOCTYPE html>
<!--[if lt IE 7]>	<html dir="ltr" lang="<?php echo LG; ?>" class="no-js ie6 lt-ie7 lt-ie8 lt-ie9 lt-ie10"> <![endif]-->
<!--[if IE 7]>		<html dir="ltr" lang="<?php echo LG; ?>" class="no-js ie7 lt-ie8 lt-ie9 lt-ie10"> <![endif]-->
<!--[if IE 8]>		<html dir="ltr" lang="<?php echo LG; ?>" class="no-js ie8 lt-ie9 lt-ie10"> <![endif]-->
<!--[if IE 9]>		<html dir="ltr" lang="<?php echo LG; ?>" class="no-js ie9 lt-ie10"> <![endif]-->
<!--[if (gte IE 9)|!(IE)]><!--><html dir="ltr" lang="<?php echo LG; ?>" class="no-js"> <!--<![endif]-->
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
	if(MULTI_LG) {
		include_once(SITE_ROOT.'php/functions/set-alt-url.php');
		
		foreach($aAltUrl as $lgTemp => $urlAlt) // parse alternative url
			echo '<link rel="alternate" href="'.$urlAlt.'" hreflang="'.$lgTemp.'" />'."\n\t";
	}
	
	/* Social share */
	include_once(SITE_ROOT.'php/shared/social-share.php');
	
	/* Favicons */
	include_once(SITE_ROOT.'php/shared/favicons.php');
	
	?>
	
	<link media="screen" rel="stylesheet" type="text/css" href="<?php echo WEB_ROOT; ?>assets/css/styles-desktop.min.css" />
	
	<!--[if lt IE 9]><script src="<?php echo WEB_ROOT; ?>js/lib/html5shiv.min.js"></script><![endif]-->
	<?php
	if(!PROD) {
		$jsonJsFiles = file_get_contents(SITE_ROOT.ASSETS.'js/js-files.json');
		$jsFiles = json_decode($jsonJsFiles, true);
		
		$files = $jsFiles['modern-detect-izr']['files'];
		
		for($i=0; $i<count($files); $i++) {
			echo '<script src="'.WEB_ROOT.'src/js/'.$files[$i].'"></script>'."\n	";
		}
	} else { ?>
	<script src="<?php echo WEB_ROOT; ?>assets/js/lib/modern-detect-izr.min.js"></script>
	<?php }
	
	/* Google Analytics */
	include_once(SITE_ROOT.'php/shared/google-analytics.php');
	
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
		