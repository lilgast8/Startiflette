	
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

<script src="<?php echo WEB_ROOT; ?>src/js/lib/zepto-1.1.3.min.js"></script>

<script src="<?php echo WEB_ROOT; ?>src/js/lib/greensock/TweenMax.min.js"></script>
<script src="<?php echo WEB_ROOT; ?>src/js/lib/history-1.8b2.min.js"></script>
<script src="<?php echo WEB_ROOT; ?>src/js/lib/preloadjs-0.4.1.min.js"></script>
<script src="<?php echo WEB_ROOT; ?>src/js/lib/signals-1.0.0.min.js"></script>
<script src="<?php echo WEB_ROOT; ?>src/js/lib/zepto.dcspamless.1.0.min.js"></script>

<?php } else { ?>
<script src="<?php echo WEB_ROOT; ?>assets/js/scripts-mobile.min.js"></script>
<?php } ?>


</body>
</html>