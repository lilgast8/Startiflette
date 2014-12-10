
<!-- JS var -->
<script>
	var LOCALHOST = '<?php echo LOCALHOST; ?>';
	var PROD  = '<?php echo PROD; ?>';
	var WEB_ROOT = '<?php echo WEB_ROOT; ?>';
	var LG = '<?php echo LG; ?>';
	var ALL_LG = <?php echo json_encode($allLg); /* [<?php echo '"'.implode('","', $allLg).'"' ?>]; */ ?>;
</script>
