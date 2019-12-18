<?php
/**
 * PHPUnit Bootstrap.
 *
 * This file is the entry point for our integration/unit test suite.
 * This file is loaded before any tests are run.
 */

// Can we avoid hard-coding these?
global $_root_dir, $_wp_dir, $_tests_dir, $_test_tools_dir, $_plugins_dir;
$_root_dir        = realpath( dirname( __FILE__ ) . '/../../' ) . '/';
$_wp_dir          = $_root_dir . 'wordpress/';
$_tests_dir       = $_root_dir . 'tests/';
$_test_tools_dir  = $_root_dir . 'test-tools/';
$_test_images_dir = $_tests_dir . 'images/';
$_plugins_dir     = $_wp_dir . 'wp-content/plugins/';

register_shutdown_function( 'admin_menu_filter_print_fatal_error' );
/**
 * Print any fatal error that occurs during a test.
 *
 * Normally PHPUnit will swallow any fatal errors that occur while
 * a test is being run. This makes debugging test failures rather
 * difficult. Since PHPUnit runs using the local version of PHP rather
 * than the version in our dev VM, the error log location can be in
 * any location, making it even more difficult for us all to find
 * error messages when fatal errors do occur while writing tests. This
 * function does not prevent the fatal error from occuring, but it
 * does at least log the fatal error to stdout so that it ends up in
 * the terminal output when running the tests.
 *
 * Taken from http://stackoverflow.com/questions/277224/how-do-i-catch-a-php-fatal-error
 */
function admin_menu_filter_print_fatal_error() {
	$error = error_get_last();
	if ( E_ERROR === $error['type'] ) {
		print_r( $error );
	}
}

// Load WordPress.
require_once $_test_tools_dir . 'includes/bootstrap.php';

// Include the NW_UnitTestCase base class.
require_once $_tests_dir . 'phpunit/AdminMenuFilter_UnitTestCase.php';
