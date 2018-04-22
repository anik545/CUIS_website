<?php
// $Id: fancyzoom_admin.inc,v 1.1.2.1 2010/07/19 04:32:15 slurslee Exp $
/**
 * @file
 * Fancyzoom administration form
 */

function fancyzoom_settings() {
  drupal_set_title(t('FancyZoom Settings'));
  return drupal_get_form('fancyzoom_settings_form');
}
function fancyzoom_settings_form() {
  $form = array(
    'fancyzoom_zoomTime' => array(
      '#title' => t('Zoom Time'),
      '#type' => 'textfield',
      '#default_value' => variable_get('fancyzoom_zoomTime', '5'),
      '#required' => 1,
      '#maxlength' => 3,
      '#description' => t('Milliseconds between frames of zoom animation.')
      ),
    'fancyzoom_zoomSteps' => array(
      '#title' => t('Zoom Steps'),
      '#type' => 'textfield',
      '#default_value' => variable_get('fancyzoom_zoomSteps', '15'),
      '#required' => 1,
      '#maxlength' => 3,
      '#description' => t('Number of zoom animation frames.')
      ),
    'fancyzoom_minBorder' => array(
      '#title' => t('Minimum Border'),
      '#type' => 'textfield',
      '#default_value' => variable_get('fancyzoom_minBorder', '90'),
      '#required' => 1,
      '#maxlength' => 3,
      '#description' => t('Minimum padding between a zoomed image and the window edges.')
      ),
    'fancyzoom_includeFade' => array(
      '#title' => t('Use Fade Effect'),
      '#type' => 'checkbox',
      '#return_value' => 1,
      '#default_value' => variable_get('fancyzoom_includeFade', '1'),
      '#description' => t('Fade the image in / out as it zooms.')
      ),
    'fancyzoom_includeCaption' => array(
      '#title' => t('Show Caption'),
      '#type' => 'checkbox',
      '#return_value' => 1,
      '#default_value' => variable_get('fancyzoom_includeCaption', '1'),
      '#description' => t('The link\'s title can appear below the zoomed image as a caption.')
      ),
    'fancyzoom_showClosebox' => array(
      '#title' => t('Show Close Box'),
      '#type' => 'checkbox',
      '#return_value' => 1,
      '#default_value' => variable_get('fancyzoom_showClosebox', '1'),
      '#description' => t('The Close Box is drawn over the top-left corner of the image.')
      ),
    'fancyzoom_shadowColor' => array(
      '#title' => t('Shadow Color'),
      '#type' => 'textfield',
      '#default_value' => variable_get('fancyzoom_shadowColor', '#000000'),
      ),
    'fancyzoom_scriptType' => array(
      '#title' => t('Script To Use'),
      '#type' => 'select',
      '#options' => array(
        'jquery-min' => t('JQuery Minimized'),
        'jquery' => t('JQuery'),
        'standard-min' => t('Standard Minimized'),
        'standard' => t('Standard')),
      '#default_value' => variable_get('fancyzoom_scriptType', 'jquery-min'),
      '#description' => t('Always use the Minimized JQuery version unless you\'re having conflicts.')
      ),
    'fancyzoom_zoomImagesURI' => array(
      '#title' => t('Zoom Images Path (!path...)', array('!path'=>"http://$_SERVER[HTTP_HOST]".base_path())),
      '#type' => 'textfield',
      '#default_value' => variable_get('fancyzoom_zoomImagesURI', drupal_get_path('module','fancyzoom').'/fancyzoom/images/zoom'),
      '#required' => 1,
      '#maxlength' => 300,
      '#description' => t('Location of the zoom images. You shouldn\'t need to change this!')
      )
  );

  if (module_exists('colorpicker')) {
    $form['fancyzoom_shadowColor']['#type'] = 'colorpicker_textfield';
    $form['fancyzoom_shadowColor']['#colorpicker'] = 'shadow_picker';
    $form['shadow_picker'] = array(
      '#type' => 'colorpicker',
      '#description' => t('Select a color in RGB format. Applies only to CSS3 compatible browsers.')
    );
  }

  $form = system_settings_form($form);
  $form['#submit'][] = '_fancyzoom_save_settings';

  return $form;
}

function fancyzoom_settings_form_validate($form, &$form_state) {
  if (!preg_match('/^#(?:(?:[a-f\d]{3}){1,2})$/i', $form_state['values']['fancyzoom_shadowColor'])) {
    form_set_error('fancyzoom_shadowColor', t('!val is not a valid hex color', array('!val' => $form_state['values']['fancyzoom_shadowColor'])));
  }
  if ($form_state['values']['fancyzoom_minBorder'] >= 100) {
    form_set_error('fancyzoom_minBorder', t('Minimum Border must be less than 100.'));
  } else if ($form_state['values']['fancyzoom_minBorder'] < 0) {
    form_set_error('fancyzoom_minBorder', t('Minimum Border must be 0 or higher.'));
  }
}
