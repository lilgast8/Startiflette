	
	</div>  <!-- End #page-container -->
	
	<!-- Footer -->
	<footer id="footer">
		
	</footer>
	
	
	<noscript>
	<!-- No JS -->
	<?php include_once(SITE_ROOT.'includes/alt/no-js.php'); ?>
	</noscript>
	
	<!-- Old browser -->
	<?php include_once(SITE_ROOT.'includes/alt/old-browser.php'); ?>
	
</div> <!-- End #main-container -->



<!-- Scripts -->
<script>
	var LOCALHOST = '<?php echo LOCALHOST; ?>';
	var PROD  = '<?php echo PROD; ?>';
	var WEB_ROOT = '<?php echo WEB_ROOT; ?>';
	var LG = '<?php echo LG; ?>';
</script>
<?php if(!PROD) { ?>

<!--[if lt IE 9]><script src="<?php echo WEB_ROOT; ?>src/js/lib/jquery-1.11.1.min.js"></script><![endif]-->
<!--[if gte IE 9]><!--><script src="<?php echo WEB_ROOT; ?>src/js/lib/zepto-1.1.3.min.js"></script><!--<![endif]-->

<script src="<?php echo WEB_ROOT; ?>src/js/lib/greensock/TweenMax.min.js"></script>
<script src="<?php echo WEB_ROOT; ?>src/js/lib/history-1.8b2.min.js"></script>
<script src="<?php echo WEB_ROOT; ?>src/js/lib/preloadjs-0.4.1.min.js"></script>
<script src="<?php echo WEB_ROOT; ?>src/js/lib/signals-1.0.0.min.js"></script>
<script src="<?php echo WEB_ROOT; ?>src/js/lib/zepto.dcspamless-1.0.min.js"></script>

<!-- Init -->
<script src="<?php echo WEB_ROOT; ?>src/js/app/InitApp.js"></script>

<!-- Config -->
<script src="<?php echo WEB_ROOT; ?>src/js/app/com/config/Config.js"></script>
<script src="<?php echo WEB_ROOT; ?>src/js/app/com/config/OldBrowser.js"></script>

<!-- Events -->
<script src="<?php echo WEB_ROOT; ?>src/js/app/com/events/EventDispatcher.class.js"></script>

<!-- Loader -->
<!-- <script src="<?php echo WEB_ROOT; ?>src/js/app/com/loader/Loader.class.js"></script> -->

<!-- Views -->
<script src="<?php echo WEB_ROOT; ?>src/js/app/com/views/View.class.js"></script>

<!-- Partials views -->
<script src="<?php echo WEB_ROOT; ?>src/js/app/com/views/partials/View.Footer.js"></script>
<script src="<?php echo WEB_ROOT; ?>src/js/app/com/views/partials/View.Header.js"></script>

<!-- Page views -->
<script src="<?php echo WEB_ROOT; ?>src/js/app/com/views/pages/View.About.js"></script>
<script src="<?php echo WEB_ROOT; ?>src/js/app/com/views/pages/View.Home.js"></script>
<script src="<?php echo WEB_ROOT; ?>src/js/app/com/views/pages/View.Legals.js"></script>

<!-- Routes -->
<script src="<?php echo WEB_ROOT; ?>src/js/app/com/routes/RoutesManager.js"></script>

<!-- Main -->
<script src="<?php echo WEB_ROOT; ?>src/js/app/Main.js"></script>

<?php } else { ?>
<!--[if lt IE 9]><script src="<?php echo WEB_ROOT; ?>assets/js/scripts-oldie.min.js"></script><![endif]-->
<!--[if (gte IE 9)|!(IE)]><!--><script src="<?php echo WEB_ROOT; ?>assets/js/scripts.min.js"></script><!--<![endif]-->
<?php } ?>


</body>
</html>