	
	</div>  <!-- End #page-container -->
	
	<!-- Footer -->
	<footer id="footer">
		<?php if (Lang::$MULTI_LANG) { ?>
		<nav class="footer-lg">
			<?php foreach(RoutesController::$ALT_LANG_URL as $lang => $altLangUrl) { ?>
			<a href="<?php echo $altLangUrl; ?>" class="footer-lg-link" data-lg="<?php echo $lang; ?>"><?php echo $lang; ?></a>
			<?php } ?>
		</nav>
		<?php } ?>
		<nav>
			<ul>
				<li>
					<a href="<?php echo Path::$LINK->static->legal_notices; ?>" class="footer-link" data-url="<?php //echo $main->routes->url->legals_ID; ?>">
						<?php //echo $main->contents->global->menu->legals; ?>
						mentions
					</a>
				</li>
			</ul>
		</nav>
	</footer>
	
	<?php include_once Path::$FILE->viewsAlt . 'no-js.php'; // no JS ?>
	
</div> <!-- End #main-container -->



<?php

/* JS var */
include_once Path::$FILE->shared . 'js-var.php';

/* JS scripts */
// echo $main->config->listJsFiles('scripts-desktop');

?>


</body>
</html>