<?php
/**
 * AdminMenuFilter Base Class for WP integration tests.
 */

class AdminMenuFilter_UnitTestCase extends WP_UnitTestCase {

	/**
	 * Set up before each test method is run.
	 */
	public function setUp() {
		parent::setUp();
	}

	/**
	 * Insert a generic test post of a specific type.
	 *
	 * @param   string  $post_type  The post type to insert (optional).
	 * @param   array   $args       The post data args to use (optional).
	 *
	 * @return  int                 The ID of the created post.
	 */
	public function insertGenericTestPost( $post_type = 'post', $args = [] ) {
		if ( empty( $args ) ) {
			$args = [
				'post_type'    => $post_type,
				'post_title'   => 'Test ' . ucwords( $post_type ),
				'post_status'  => 'publish',
				'post_content' => 'Test ' . $post_type . ' content.',
			];
		} else {
			$args = array_merge( $args, [ 'post_type' => $post_type ] );
		}

		return self::factory()->post->create( $args );
	}

	/**
	 * Tear down after each test method is run.
	 */
	public function tearDown() {
		parent::tearDown();
	}
}
