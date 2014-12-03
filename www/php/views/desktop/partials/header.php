<!DOCTYPE html>
<html class="no-js" lang="fr">
<head>
	<meta charset="utf-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge, chrome=1" />
	
	<title><?php echo $titlePage; ?></title>
	<meta name="description" content="<?php echo $descPage; ?>" />
	<meta name="keywords" content="" />
	<meta name="robots" content="index, follow" />
	<meta name="author" content="Gaston Bouchayer" />
	<meta name="designer" content="Gaston Bouchayer" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<meta name="format-detection" content="telephone=no">
	<?php
	$aAltLink = array();
	
	if(MULTI_LG) {
		for($i=0; $i<count($aLg); $i++) {
			$lgTemp = $aLg[$i];
			
			if($lgTemp != LG) {
				$urlPageAlt = $pageId != 0 ? '/'.$aPages[$lgTemp][$pageId]['url'] : '';
				$urlAlt = $lgTemp == DEFAULT_LG && $pageId == 0 ? WEB_ROOT : WEB_ROOT.$lgTemp.$urlPageAlt;
				
				$aAltLink[$lgTemp] = $urlAlt;
				
				echo '<link rel="alternate" href="'.$urlAlt.'" hreflang="'.$lgTemp.'" />'."\n\t";
			}
		}
	}
	?>
	
	<!-- Facebook -->
	<meta property="og:title" content="" />
	<meta property="og:site_name" content="" />
	<meta property="og:description" content="" />
	<meta property="og:url" content="<?php echo SITE_URL; ?>" />
	<meta property="og:image" content="<?php echo SITE_URL; ?>/img/logos/partage.png" />
	<meta property="og:type" content="website" />
	<!-- Google Plus -->
	<meta itemprop="name" content="" />
	<meta itemprop="description" content="" />
	<meta itemprop="image" content="<?php echo WEB_ROOT; ?>img/logos/partage.png" />
	<!-- Twitter -->
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content="" />
	<meta name="twitter:description" content="" />
	<meta name="twitter:site" content="@LilGast8" />
	<meta name="twitter:creator" content="@LilGast8" />
	<meta name="twitter:url" content="<?php echo WEB_ROOT; ?>" />
	<meta name="twitter:image" content="<?php echo WEB_ROOT; ?>img/divers/twitter.jpg" />
	
	<link rel="shortcut icon" href="<?php echo WEB_ROOT; ?>img/logos/favicons/favicon.ico" />
	<link rel="apple-touch-icon" sizes="57x57" href="<?php echo WEB_ROOT; ?>img/logos/favicons/apple-touch-icon-57x57.png" />
	<link rel="apple-touch-icon" sizes="114x114" href="<?php echo WEB_ROOT; ?>img/logos/favicons/apple-touch-icon-114x114.png" />
	<link rel="apple-touch-icon" sizes="72x72" href="<?php echo WEB_ROOT; ?>img/logos/favicons/apple-touch-icon-72x72.png" />
	<link rel="apple-touch-icon" sizes="144x144" href="<?php echo WEB_ROOT; ?>img/logos/favicons/apple-touch-icon-144x144.png" />
	<link rel="apple-touch-icon" sizes="60x60" href="<?php echo WEB_ROOT; ?>img/logos/favicons/apple-touch-icon-60x60.png" />
	<link rel="apple-touch-icon" sizes="120x120" href="<?php echo WEB_ROOT; ?>img/logos/favicons/apple-touch-icon-120x120.png" />
	<link rel="apple-touch-icon" sizes="76x76" href="<?php echo WEB_ROOT; ?>img/logos/favicons/apple-touch-icon-76x76.png" />
	<link rel="apple-touch-icon" sizes="152x152" href="<?php echo WEB_ROOT; ?>img/logos/favicons/apple-touch-icon-152x152.png" />
	<link rel="icon" type="image/png" href="<?php echo WEB_ROOT; ?>img/logos/favicons/favicon-196x196.png" sizes="196x196" />
	<link rel="icon" type="image/png" href="<?php echo WEB_ROOT; ?>img/logos/favicons/favicon-160x160.png" sizes="160x160" />
	<link rel="icon" type="image/png" href="<?php echo WEB_ROOT; ?>img/logos/favicons/favicon-96x96.png" sizes="96x96" />
	<link rel="icon" type="image/png" href="<?php echo WEB_ROOT; ?>img/logos/favicons/favicon-32x32.png" sizes="32x32" />
	<link rel="icon" type="image/png" href="<?php echo WEB_ROOT; ?>img/logos/favicons/favicon-16x16.png" sizes="16x16" />
	<meta name="msapplication-TileColor" content="#ffffff" />
	<meta name="msapplication-TileImage" content="<?php echo WEB_ROOT; ?>img/logos/favicons/mstile-144x144.png" />
	<meta name="msapplication-square70x70logo" content="<?php echo WEB_ROOT; ?>img/logos/favicons/mstile-70x70.png" />
	<meta name="msapplication-square144x144logo" content="<?php echo WEB_ROOT; ?>img/logos/favicons/mstile-144x144.png" />
	<meta name="msapplication-square150x150logo" content="<?php echo WEB_ROOT; ?>img/logos/favicons/mstile-150x150.png" />
	<meta name="msapplication-square310x310logo" content="<?php echo WEB_ROOT; ?>img/logos/favicons/mstile-310x310.png" />
	<meta name="msapplication-wide310x150logo" content="<?php echo WEB_ROOT; ?>img/logos/favicons/mstile-310x150.png" />
	
	<link media="screen" rel="stylesheet" type="text/css" href="<?php echo WEB_ROOT; ?>assets/css/styles.min.css" />
	
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
	<?php } ?>
	
	<?php if(!LOCALHOST && PROD) { ?>
	<!-- Google Analytics -->
	<script>
		(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
		ga('create', 'UA-XXXXXXXX-XX', 'SITE-URL.COM');
		ga('send', 'pageview');
	</script>
	<?php } ?>
</head>


<!--[if lt IE 7]> <body class="ie6 lt-ie7 lt-ie8 lt-ie9 lt-ie10"> <![endif]-->
<!--[if IE 7]> <body class="ie7 lt-ie8 lt-ie9 lt-ie10"> <![endif]-->
<!--[if IE 8]> <body class="ie8 lt-ie9 lt-ie10"> <![endif]-->
<!--[if IE 9]> <body class="ie9 lt-ie10"> <![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--> <body> <!--<![endif]-->



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
					<a href="<?php echo WEB_ROOT.LG_LINK_ROOT; ?>" class="menu-link" data-url="<?php echo $aPages[LG][0]['url']; ?>">Accueil</a>
				</li>
				<li>
					<a href="<?php echo WEB_ROOT.LG_LINK.$aPages[LG][1]['url']; ?>" class="menu-link" data-url="<?php echo $aPages[LG][1]['url']; ?>">À propos</a>
				</li>
				<li>
					<a href="<?php echo WEB_ROOT.LG_LINK.$aPages[LG][2]['url']; ?>" class="menu-link" data-url="<?php echo $aPages[LG][2]['url']; ?>">Projets</a>
				</li>
			</ul>
		</nav>
	</header>
	
	<!-- Page container -->
	<div id="page-container">
		