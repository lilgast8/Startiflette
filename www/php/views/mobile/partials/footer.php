	
	</div>  <!-- End #page-container -->
	
	<!-- Footer -->
	<footer id="footer">
		<?php if(MULTI_LG) { ?>
		<nav class="footer-lg">
			<?php foreach($aAltUrl as $lgTemp => $altUrl) { ?>
			<a href="<?php echo $altUrl; ?>" class="footer-lg-link" data-lg="<?php echo $lgTemp; ?>"><?php echo $lgTemp; ?></a>
			<?php } ?>
		</nav>
		<?php } ?>
		<nav>
			<ul>
				<li>
					<a href="<?php echo $aUrl->legals; ?>" class="footer-link" data-url="<?php echo $aUrl->legalsId; ?>">
						<?php echo $glo_menu_txt['legals']; ?>
					</a>
				</li>
			</ul>
		</nav>
	</footer>
	
	<?php include_once(SITE_ROOT.'php/views/alt/no-js.php'); // no JS ?>
	
</div> <!-- End #main-container -->



<?php

include_once(SITE_ROOT.'php/shared/js-var.php'); // JS var

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