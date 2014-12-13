	
	</div>  <!-- End #page-container -->
	
	<!-- Footer -->
	<footer id="footer">
		<?php if(Config::$MULTI_LANG) { ?>
		<nav class="footer-lg">
			<?php foreach($main->routes->altUrl as $lang => $urlAlt) { ?>
			<a href="<?php echo $urlAlt; ?>" class="footer-lg-link" data-lg="<?php echo $lang; ?>"><?php echo $lang; ?></a>
			<?php } ?>
		</nav>
		<?php } ?>
		<nav>
			<ul>
				<li>
					<a href="<?php echo $main->routes->url->legals; ?>" class="footer-link" data-url="<?php echo $main->routes->url->legalsId; ?>">
						<?php echo $main->contents->global->menu->legals; ?>
					</a>
				</li>
			</ul>
		</nav>
	</footer>
	
	<?php include_once $main->path->file->base.'php/views/alt/no-js.php'; // no JS ?>
	
</div> <!-- End #main-container -->



<?php

include_once $main->path->file->base.'php/shared/js-var.php'; // JS var

if(!$main::PROD) {
	$jsonJsFiles = file_get_contents($main->path->file->js.'js-files.json');
	$jsFiles = json_decode($jsonJsFiles, true);
	
	$files = $jsFiles['scripts-desktop']['files'];
	
	for($i=0; $i<count($files); $i++) {
		if(is_array($files[$i])) {
			echo '<!--[if lt IE 9]><script src="' . $main->path->url->base . 'src/js/' . $files[$i][1] . '"></script><![endif]-->' . "\n";
			echo '<!--[if gte IE 9]><!--><script src="' . $main->path->url->base . 'src/js/' . $files[$i][0] . '"></script><!--<![endif]-->' . "\n";
		}
		else echo '<script src="' . $main->path->url->base . 'src/js/' . $files[$i] . '"></script>' . "\n";
	}

} else { ?>

<!--[if lt IE 9]><script src="<?php echo $main->path->url->base; ?>assets/js/scripts-oldie.min.js"></script><![endif]-->
<!--[if (gte IE 9)|!(IE)]><!--><script src="<?php echo $main->path->url->base; ?>assets/js/scripts.min.js"></script><!--<![endif]-->

<?php } ?>


</body>
</html>