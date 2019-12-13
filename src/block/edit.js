/**
 * External dependencies
 */
//import { invoke } from 'lodash';
import { __, _x } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import { Placeholder, SandBox, Button, IconButton, Toolbar } from '@wordpress/components';
import { BlockControls, BlockIcon } from '@wordpress/block-editor';
import md5 from 'md5';

/**
 * Internal dependencies
 */
import { fallback, embedType } from './utils';
import EmbedSrc from './embed';
import { icon } from '.';

class TwitchEdit extends Component {
	constructor() {
		super( ...arguments );

		this.state = {
			editedUrl: this.props.attributes.url || '',
			editingUrl: false,
			// The interactive-related magic comes from Core's EmbedPreview component,
			// which currently isn't exported in a way we can use.
			interactive: false,
		};
	}

	hideOverlay = () => {
		// This is called onMouseUp on the overlay. We can't respond to the `isSelected` prop
		// changing, because that happens on mouse down, and the overlay immediately disappears,
		// and the mouse event can end up in the preview content. We can't use onClick on
		// the overlay to hide it either, because then the editor misses the mouseup event, and
		// thinks we're multi-selecting blocks.
		this.setState( { interactive: true } );
	};

	// Sets the URL property for the embed.
	setUrl = event => {
		if ( event ) {
			event.preventDefault();
		}

		const { editedUrl: url } = this.state;

		this.props.setAttributes( { url } );
		this.setState( { editingUrl: false } );

	};

	/**
	 * Render a preview of the Pinterest embed.
	 *
	 * @returns {object} The UI displayed when user edits this block.
	 */
	render( ) {
		const { isSelected, attributes, className } = this.props;
		const { url } = attributes;
		const { editedUrl, interactive, editingUrl, resolvingRedirect } = this.state;
		const type = embedType( url );
		const vidHash = md5( url );
		const cannotEmbed = url && ! type;
		const controls = (
			<BlockControls>
				<Toolbar>
					<IconButton
						className="components-toolbar__control"
						label={ __( 'Edit URL', 'embed-twitch' ) }
						icon="edit"
						onClick={ () => this.setState( { editingUrl: true, html: `<b>hi</b>` } ) }
					/>
				</Toolbar>
			</BlockControls>
		);

		if ( editingUrl || ! url || cannotEmbed ) {
			return (
				<div className={ className }>
					{ controls }
					<Placeholder label={ __( 'Twitch', 'embed-twitch' ) } icon={ <BlockIcon icon={ icon } /> }>
						<form onSubmit={ this.setUrl }>
							<input
								type="url"
								value={ editedUrl }
								className="components-placeholder__input"
								aria-label={ __( 'Twitch URL', 'embed-twitch' ) }
								placeholder={ __( 'Enter URL to embed here…', 'embed-twitch' ) }
								onChange={ event => this.setState( { editedUrl: event.target.value } ) }
							/>
							<Button isLarge type="submit">
								{ _x( 'Embed', 'button label', 'embed-twitch' ) }
							</Button>
							{ cannotEmbed && (
								<p className="components-placeholder__error">
									{ __( 'Sorry, this content could not be embedded.', 'embed-twitch' ) }
									<br />
									<Button isLarge onClick={ () => fallback( editedUrl, this.props.onReplace ) }>
										{ _x( 'Convert to link', 'button label', 'embed-twitch' ) }
									</Button>
								</p>
							) }
						</form>
					</Placeholder>
				</div>
			);
		}

		// Disabled because the overlay div doesn't actually have a role or functionality
		// as far as the user is concerned. We're just catching the first click so that
		// the block can be selected without interacting with the embed preview that the overlay covers.
		/* eslint-disable jsx-a11y/no-static-element-interactions */
		return (
			<div className={ className }>
				{ controls }
				<EmbedSrc width='580' height='326' type={type.type} id={type.ID} vidHash={ vidHash } onFocus={ this.hideOverlay } />
				{ ! interactive && (
					<div
						className="block-library-embed__interactive-overlay"
						onMouseUp={ this.hideOverlay }
					/>
				) }
			</div>
		);
	}
}

export default TwitchEdit;