<?php
  $h = variable_get('fancyzoom_shadowColor', '#000000');
  if (strlen($h) == 4) {
    $h = preg_replace('/#(.)(.)(.)/', '#\1\1\2\2\3\3', $h);
  }
?>
var fzIncludeCaption = <?php echo variable_get('fancyzoom_includeCaption', '1') ? 'true' : 'false' ?>,
	  fzShowCloseBox   = <?php echo variable_get('fancyzoom_showClosebox', '1') ? 'true' : 'false' ?>,
    fzZoomTime       = <?php echo variable_get('fancyzoom_zoomTime', '5') ?>,
    fzZoomSteps      = <?php echo variable_get('fancyzoom_zoomSteps', '15') ?>,
    fzIncludeFade    = <?php echo variable_get('fancyzoom_includeFade', '1') ?>,
    fzMinBorder      = <?php echo variable_get('fancyzoom_minBorder', '90') ?>,
    fzShadowSettings = '0px 5px 25px rgba(<?php print hexdec(substr($h, 1, 2)).", ".hexdec(substr($h, 3, 2)).", ".hexdec(substr($h, 5, 2)) ?>, ',
    fzZoomImagesURI  = '<?php echo base_path().variable_get('fancyzoom_zoomImagesURI', drupal_get_path('module','fancyzoom').'/fancyzoom/images/zoom') ?>/';
