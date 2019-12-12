//  Import CSS.
import './style.scss';
import './editor.scss';

/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { G, Path, Rect, SVG } from '@wordpress/components';
import { createBlock } from '@wordpress/blocks';

const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks

/**
 * Internal dependencies
 */
import edit from './edit';
import save from './save';
import { embedType } from './utils';
import EmbedSrc from './embed';

export const URL_REGEX = /^\s*https?:\/\/(?:www\.|clips\.)?(?:[a-z]{2}\.)?(?:twitch\.[a-z.]+)\/([^/]+)(\/[^/]+)?/i;
export const name = 'twitch';
export const title = __( 'Twitch', 'embed-twitch' );
export const icon = (
	<SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
		<path d="M1 4v17h6v3h3l3-3h5l6-6V0H3zm4-2h17v12l-4 3h-6l-3 3v-3H5z"/>
		<path d="M10 6h2v7h-2zM16 6h2v7h-2z"/>
	</SVG>
);

// Set up block settings.
export const settings = {
	title,
	description: __( 'Embed a Twitch link.', 'embed-twitch' ),
	icon,
	category: 'embed',

	supports: {
		align: true,
		align: [ 'wide', 'full' ],
		html: false,
	},

	attributes: {
		url: {
			type: 'string',
		},
	},

	edit: edit,
	save: save,

	transforms: {
		from: [
			{
				type: 'raw',
				isMatch: node => node.nodeName === 'P' && URL_REGEX.test( node.textContent ),
				transform: node => {
					return createBlock( 'emrikol/embed-twitch', {
						url: node.textContent.trim(),
					} );
				},
			},
		],
	},

	example: {
		attributes: {
			url: 'https://www.twitch.tv/backlogathon/video/336186687',
		},
	},
};

registerBlockType( 'emrikol/embed-twitch', settings );
