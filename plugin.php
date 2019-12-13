<?php
/**
 * Plugin Name: Embeds for Twitch and Gutenberg.
 * Plugin URI: https://github.com/emrikol/embed-twitch/
 * Description: Allows Twitch channels, videos, and clips to be auto-embedded.
 * Author: Derrick Tennant
 * Author URI: https://emrikol.com/
 * Version: 0.1.0
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
