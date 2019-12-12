// External dependencies
import { Component } from '@wordpress/element';

// Internal dependencies
import { embedType } from './utils';
import EmbedSrc from './embed';

class TwitchSave extends Component {

	render() {
		const { attributes, className } = this.props;
		const { url } = attributes;
		const type = embedType( url );

		return (
			<div className={ className }>
				<EmbedSrc width='200' height='200' type={type.type} id={type.ID} />
			</div>
		);
	}
}

export default TwitchSave;