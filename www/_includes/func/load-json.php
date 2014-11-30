<?php

$jsonPages = file_get_contents(SITE_ROOT.ASSETS.'json/pages-'.LG.'.json');
$pages = json_decode($jsonPages, true);

$jsonProjects = file_get_contents(SITE_ROOT.ASSETS.'json/projects-'.LG.'.json');
$projects = json_decode($jsonProjects, true);

?>