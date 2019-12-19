<?php
/**
 * Plugin Name: Admin Menu Filter
 * Description: Advanced phonetic menu filter plugin.
 * Version: 1.0
 * Author: Nathan Lampe
 * Text Domain: admin-menu-filter
 * Domain Path: /languages/
 *
 * @package AdminMenuFilter
 * @author  Nathan Lampe
 */

namespace AdminMenuFilter;

// Autoload our dependencies.
require __DIR__ . '/vendor/autoload.php';

// Disallows direct file access when core isn't loaded.
defined( 'ABSPATH' ) or exit;

define( 'ADMIN_MENU_FILTER_VERSION', '1.0' );
define( 'ADMIN_MENU_FILTER_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
define( 'ADMIN_MENU_FILTER_PLUGIN_URL', plugin_dir_url( __FILE__ ) );
define( 'ADMIN_MENU_FILTER_PLUGIN_BASENAME', plugin_basename( __FILE__ ) );

load_plugin_textdomain( 'admin-menu-filter', false, basename( dirname( __FILE__ ) ) . '/languages' );

if ( is_admin() ) {
	// Start admin on plugins loaded.
	add_action( 'plugins_loaded', [ '\AdminMenuFilter\AdminMenuFilter', 'admin_init' ] );
}
