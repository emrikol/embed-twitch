<?php
/**
 * Blocks Initializer
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Enqueue Gutenberg block assets for both frontend + backend.
 */
function emrikol_embed_twitch_assets() { // phpcs:ignore
	// Register block styles for both frontend + backend.
	wp_register_style(
		'embed_twitch-style',
		plugins_url( 'dist/blocks.style.build.css', dirname( __FILE__ ) ),
		array( 'wp-editor' ),
		filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.style.build.css' )
	);

	// Register block editor script for backend.
	wp_register_script(
		'embed_twitch-block',
		plugins_url( '/dist/blocks.build.js', dirname( __FILE__ ) ),
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor', 'twitch.tv-embed' ),
		filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.build.js' ),
		true 
	);

	// Register twitch.tv embed script.
	wp_register_script( 'twitch.tv-embed', 'https://embed.twitch.tv/embed/v1.js', array(), '1' );

	// Register block editor styles for backend.
	wp_register_style(
		'embed_twitch-block-editor',
		plugins_url( 'dist/blocks.editor.build.css', dirname( __FILE__ ) ),
		array( 'wp-edit-blocks' ),
		filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.editor.build.css' )
	);

	// Register Gutenberg block on server-side.
	register_block_type(
		'emrikol/embed-twitch', array(
			'editor_script' => 'embed_twitch-block',
			'editor_style'  => 'embed_twitch-block-editor',
			'script'        => 'twitch.tv-embed',
			'style'         => 'embed_twitch-style',
		)
	);
}

// Hook: Block assets.
add_action( 'init', 'emrikol_embed_twitch_assets' );
