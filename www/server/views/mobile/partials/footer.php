	
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
					<a href="<?php echo $main->routes->url->legals; ?>" class="footer-link" data-url="<?php echo $main->routes->url->legals_ID; ?>">
						<?php echo $main->contents->global->menu->legals; ?>
					</a>
				</li>
			</ul>
		</nav>
	</footer>
	
	<?php include_once $main->path->file->base.'server/views/alt/no-js.php'; // no JS ?>
	
</div> <!-- End #main-container -->



<?php

/* JS var */
include_once $main->path->file->base.'server/shared/js-var.php';

/* JS scripts */
echo $main->config->listJsFiles('scripts-mobile');

?>


</body>
</html>