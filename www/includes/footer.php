	
	</div>  <!-- Fin #conteneurPage -->
	
	<noscript>
	<!-- No JS -->
	<?php include_once(RACINE_SITE.'alt/no-js.php'); ?>
	</noscript>
	
	<!-- Old browser -->
	<?php include_once(RACINE_SITE.'alt/old-browser.php'); ?>
	
</div> <!-- Fin #conteneurSite -->



<!-- Scripts -->
<script>
	var _localhost = '<?php echo LOCALHOST; ?>';
	var _prod  = '<?php echo PROD; ?>';
	var _racineWeb = '<?php echo RACINE_WEB; ?>';
	var _lg = '<?php echo LG; ?>';
</script>
<?php if(PROD == 'false') { ?>
<script src="<?php echo RACINE_WEB; ?>src/js/libs/browser-detect.js"></script>
<!--[if lt IE 9]><script src="<?php echo RACINE_WEB; ?>src/js/libs/jquery-1.11.0.min.js"></script><![endif]-->
<!--[if gte IE 9]><!--><script src="<?php echo RACINE_WEB; ?>src/js/libs/jquery-2.1.0.min.js"></script><!--<![endif]-->
<script src="<?php echo RACINE_WEB; ?>src/js/libs/greensock/TweenMax.min.js"></script>
<script src="<?php echo RACINE_WEB; ?>src/js/libs/jquery.address.min.js"></script>
<script src="<?php echo RACINE_WEB; ?>src/js/scripts.js"></script>
<?php } else { ?>
<!--[if lt IE 9]><script src="<?php echo RACINE_WEB; ?>js/scripts-oldie.min.js"></script><![endif]-->
<!--[if (gte IE 9)|!(IE)]><!--><script src="<?php echo RACINE_WEB; ?>js/scripts.min.js"></script><!--<![endif]-->
<?php } ?>


</body>
</html>