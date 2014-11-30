	
	</div>  <!-- End #page-container -->
	
	<!-- Footer -->
	<footer id="footer">
		<nav>
			<ul>
				<li><a href="<?php echo WEB_ROOT; ?>mentions-legales" class="footer-link">Mentions légales</a></li>
			</ul>
		</nav>
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
</script>
<?php
if(!PROD) {
	$jsonJsFiles = file_get_contents(SITE_ROOT.ASSETS.'js/js-files.json');
	$jsFiles = json_decode($jsonJsFiles, true);
	
	$files = $jsFiles['scripts-desktop']['files'];
	
	for($i=0; $i<count($files); $i++) {
		if(is_array($files[$i])) {
			echo '<!--[if lt IE 9]><script src="'.WEB_ROOT.'src/js/'.$files[$i][1].'"></script><![endif]-->'."\n";
			echo '<!--[if gte IE 9]><!--><script src="'.WEB_ROOT.'src/js/'.$files[$i][0].'"></script><!--<![endif]-->'."\n";
		}
		else echo '<script src="'.WEB_ROOT.'src/js/'.$files[$i].'"></script>'."\n";
	}
} else { ?>
<!--[if lt IE 9]><script src="<?php echo WEB_ROOT; ?>assets/js/scripts-oldie.min.js"></script><![endif]-->
<!--[if (gte IE 9)|!(IE)]><!--><script src="<?php echo WEB_ROOT; ?>assets/js/scripts.min.js"></script><!--<![endif]-->
<?php } ?>


</body>
</html>