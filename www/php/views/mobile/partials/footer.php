	
	</div>  <!-- End #page-container -->
	
	<!-- Footer -->
	<footer id="footer">
		
	</footer>
	
	<!-- No JS -->
	<noscript>
	<?php include_once(SITE_ROOT.'includes/alt/no-js.php'); ?>
	</noscript>
	
</div> <!-- End #main-container -->



<!-- Scripts -->
<script>
	var LOCALHOST = '<?php echo LOCALHOST; ?>';
	var PROD  = '<?php echo PROD; ?>';
	var WEB_ROOT = '<?php echo WEB_ROOT; ?>';
	var LG = '<?php echo LG; ?>';
	var MULTI_LG = '<?php echo MULTI_LG; ?>';
</script>
<?php
if(!PROD) {
	$jsonJsFiles = file_get_contents(SITE_ROOT.ASSETS.'js/js-files.json');
	$jsFiles = json_decode($jsonJsFiles, true);
	
	$files = $jsFiles['scripts-mobile']['files'];
	
	for($i=0; $i<count($files); $i++) {
		if(is_array($files[$i])) echo '<script src="'.WEB_ROOT.'src/js/'.$files[$i][0].'"></script>'."\n";
		else echo '<script src="'.WEB_ROOT.'src/js/'.$files[$i].'"></script>'."\n";
	}
} else { ?>
<script src="<?php echo WEB_ROOT; ?>assets/js/scripts-mobile.min.js"></script>
<?php } ?>


</body>
</html>