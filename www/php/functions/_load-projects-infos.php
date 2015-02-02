<?php


/* -------- Projects -------- */
$jsonProjects = file_get_contents(SITE_ROOT.ASSETS.'json/'.LG.'/projects.json');
$projects = json_decode($jsonProjects, true);


?>