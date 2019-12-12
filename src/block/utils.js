/**
 * External dependencies
 */
import { getPath } from '@wordpress/url';
import { renderToString } from '@wordpress/element';
import { createBlock } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import { URL_REGEX } from '.';
import { useEffect } from 'react';

export function useScript( url ) {
  useEffect(() => {
    const script = document.createElement('script');

    script.src = url;
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    }
  }, [url]);
};

/**
 * Determines the embed type from the URL.
 *
 * @param {string} url The URL to check.
 * @returns {string} The embed type. Empty string if it isn't a valid Twitch URL.
 */
export function embedType( url ) {
	if ( ! URL_REGEX.test( url ) || ! getPath( url ) ) {
		return '';
	}

	const path = getPath( url );

	// Clip: https://clips.twitch.tv/ObservantEmpathicEyeballDerp
	if ( url.match( /clips\.twitch\.tv\/[A-Za-z]+/ ) ) {
		return( {
			type: 'clip',
			ID: path.match( /^[a-zA-Z0-9]+/ )[0],
		} );
	}

	// Single video: https://www.twitch.tv/videos/512947721
	if ( path.startsWith( 'videos/' ) && path.match( /^videos\/([0-9]+)/ ) ) {
		return ( {
			type: 'video',
			ID: parseInt( path.match( /[0-9]+/ )[0] ),
		} );
	}

	// Channel video: https://www.twitch.tv/backlogathon/video/336186687
	if ( path.match( /^[a-zA-Z0-9]+\/video\/[0-9]+/ ) ) {
		return ( {
			type: 'video',
			ID: parseInt( path.match( /[0-9]+/ )[0] ),
		} );
	}

	// Channel: https://www.twitch.tv/backlogathon
	if ( path.match( /^[a-zA-Z0-9]+\/?$/ ) ) {
		return ( {
			type: 'channel',
			ID: path.match( /^[a-zA-Z0-9]+/ )[0],
		} );
	}

	return '';
}

/**
 * Fallback behaviour for unembeddable URLs.
 * Creates a paragraph block containing a link to the URL, and calls `onReplace`.
 *
 * @param {string}   url       The URL that could not be embedded.
 * @param {Function} onReplace Function to call with the created fallback block.
 */
export function fallback( url, onReplace ) {
	const link = <a href={ url }>{ url }</a>;
	onReplace( createBlock( 'core/paragraph', { content: renderToString( link ) } ) );
}