<?php

namespace AdminMenuFilter;

/**
 * Class AdminMenuFilter
 *
 * @package AdminMenuFilter
 */
class AdminMenuFilter {

	/**
	 * @var  null  $instance  Holds an instance of the object.
	 */
	private static $instance = null;


	/**
	 * AdminMenuFilterAdmin constructor.
	 */
	private function __construct() {

		// Add options settings menu link to plugins page.
		add_filter( 'plugin_action_links_' . ADMIN_MENU_FILTER_PLUGIN_BASENAME, [ $this, 'settings_link' ] );

		// Register activation and deactivation hooks.
		register_activation_hook( __FILE__, [ $this, 'activation' ] );
		register_deactivation_hook( __FILE__, [ $this, 'deactivation' ] );

		add_action( 'admin_enqueue_scripts', [ $this, 'enqueue_admin_scripts' ] );
	}

	/**
	 * Admin init.
	 *
	 * @return  object  Returns and instance of the running object.
	 */
	public static function admin_init() {
		is_null( self::$instance ) and self::$instance = new self;
		return self::$instance;
	}

	/**
	 * Enqueue Scripts
	 */
	public static function enqueue_admin_scripts() {

		$js_dist_path = 'dist/scripts/admin-menu-filter.min.js';
		$css_dist_path = 'dist/styles/admin-menu-filter.min.css';

		wp_enqueue_script(
			'admin-menu-filter-js',
			ADMIN_MENU_FILTER_PLUGIN_URL . $js_dist_path,
			'',
			filemtime( ADMIN_MENU_FILTER_PLUGIN_DIR . $js_dist_path ),
			true
		);

		wp_enqueue_style(
			'admin-menu-filter',
			ADMIN_MENU_FILTER_PLUGIN_URL . $css_dist_path,
			filemtime( ADMIN_MENU_FILTER_PLUGIN_DIR . $css_dist_path ),
			true
		);

	}
}
