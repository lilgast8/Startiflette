<?php

include_once('../../init.php');
include_once(SITE_ROOT.'includes/contents/texts-'.LG.'.php');

?>

<!-- Old browser -->
<div id="old-browser">
	<div class="container">
		<div class="alt-title"><?php echo $glo_oldB_title; ?></div>
		<p><?php echo $glo_oldB_desc; ?></p>
		<div class="browsers">
			<a href="http://www.google.com/chrome" target="_blank" class="chrome">
				<div class="alt-subtitle">Chrome</div>
				<p><?php echo $glo_oldB_download; ?></p>
			</a>
			<a href="http://www.mozilla.org/firefox" target="_blank" class="firefox">
				<div class="alt-subtitle">Firefox</div>
				<p><?php echo $glo_oldB_download; ?></p>
			</a>
			<a href="http://www.apple.com/safari" target="_blank" class="safari">
				<div class="alt-subtitle">Safari</div>
				<p><?php echo $glo_oldB_download; ?></p>
			</a>
			<a href="http://www.opera.com/download" target="_blank" class="opera">
				<div class="alt-subtitle">Opera</div>
				<p><?php echo $glo_oldB_download; ?></p>
			</a>
			<a href="http://www.microsoft.com/france/windows/internet-explorer" target="_blank" class="ie">
				<div class="alt-subtitle">Internet Explorer</div>
				<p><?php echo $glo_oldB_download; ?></p>
			</a>
		</div>
	</div>
</div>
