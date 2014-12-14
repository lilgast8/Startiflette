
<!-- JS var -->
<script>
	var LOCALHOST	= '<?php echo Config::$LOCALHOST; ?>';
	var PROD		= '<?php echo Config::PROD; ?>';
	var WEB_ROOT	= '<?php echo $main->path->url->base; ?>';
	var LANG		= '<?php echo Config::$LANG; ?>';
	var ALL_LANG	= <?php echo json_encode(Config::$ALL_LANG); /* [<?php echo '"'.implode('","', $allLg).'"' ?>]; */ ?>;
</script>
