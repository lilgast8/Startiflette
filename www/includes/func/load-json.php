<?php

$jsonInfosPages = file_get_contents(SITE_ROOT.ASSETS.'json/infos-pages-'.LG.'.json');
$infosPages = json_decode($jsonInfosPages, true);

?>