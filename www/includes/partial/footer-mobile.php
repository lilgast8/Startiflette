	
	</div>  <!-- Fin #page-container -->
	
	<!-- Footer -->
	<footer id="footer">
		
	</footer>
	
	
	<noscript>
	<!-- No JS -->
	<?php include_once(SITE_ROOT.'includes/alt/no-js.php'); ?>
	</noscript>
	
	<!-- Old browser -->
	<?php include_once(SITE_ROOT.'includes/alt/old-browser.php'); ?>
	
</div> <!-- Fin #main-container -->



<!-- Scripts -->
<script>
	var _localhost = '<?php echo LOCALHOST; ?>';
	var _prod  = '<?php echo PROD; ?>';
	var _racineWeb = '<?php echo WEB_ROOT; ?>';
	var _lg = '<?php echo LG; ?>';
</script>
<?php if(!PROD) { ?>
<script src="<?php echo WEB_ROOT; ?>src/js/lib/detectizr.min.js"></script>
<script src="<?php echo WEB_ROOT; ?>src/js/lib/jquery-2.1.0.min.js"></script>
<script src="<?php echo WEB_ROOT; ?>src/js/lib/greensock/TweenMax.min.js"></script>
<script src="<?php echo WEB_ROOT; ?>src/js/lib/jquery.address.min.js"></script>
<script src="<?php echo WEB_ROOT; ?>src/js/scripts-mobile.js"></script>
<?php } else { ?>
<!--[if (gte IE 9)|!(IE)]><!--><script src="<?php echo WEB_ROOT; ?>assets/js/scripts-mobile.min.js"></script><!--<![endif]-->
<?php } ?>


</body>
</html>