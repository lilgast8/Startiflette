<?php

if(isset($_POST['ajax'])) {
	include_once('../../../../init.php');
	include_once(SITE_ROOT.'php/contents/'.LG.'/texts.php');
	include_once(SITE_ROOT.'php/functions/load-pages-infos.php');
}

?>

<!-- Project -->
<section id="page-content" class="project">
	
	<br><br><br>
	- Desktop page content / Projet / <?php echo $_GET['subPage'].'/'.$_GET['part']; ?> -
	<br><br><br><br>
	
</section>
