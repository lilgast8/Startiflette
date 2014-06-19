<?php


/* -------- Header -------- */
function includeHeader($titrePage) {
	if(!isset($_POST['Page'])) {
		include_once('includes/header.php');
		headerHTML($titrePage);
	}
}


/* -------- Footer -------- */
function includeFooter() {
	if(!isset($_POST['Page'])) include_once('includes/footer.php');
}



?>