
<?php if ( Config::$ENV == 'prod' && !empty( Config::$GA_ID ) ) { ?>
	<!-- Google Analytics -->
	<script>
		(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
		<?php
		foreach ( Config::$GA_ID as $gaName => $gaId ) {
			if ( $gaName == 'null' ) {
		?>
		ga( 'create', '<?php echo $gaId; ?>', 'auto' );
		ga( 'send', 'pageview' );
		<?php } else { ?>
		ga( 'create', '<?php echo $gaId; ?>', 'auto', '<?php echo $gaName; ?>' );
		ga( '<?php echo $gaName; ?>.send', 'pageview' );
		<?php
			}
		}
		?>
	</script>
<?php } ?>
