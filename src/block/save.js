// External dependencies
import { Component } from '@wordpress/element';

// Internal dependencies
import { embedType } from './utils';
import EmbedSrc from './embed';
import md5 from 'md5';

class TwitchSave extends Component {

	render() {
		const { attributes, className } = this.props;
		const { url } = attributes;
		const type = embedType( url );
		const vidHash = md5( url );

		return (
			<div className={ className }>
				<EmbedSrc width='580' height='326' type={type.type} id={type.ID} vidHash={ vidHash } />
			</div>
		);
	}
}

export default TwitchSave;