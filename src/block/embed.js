// External dependencies
import { Component } from '@wordpress/element';
import { withInstanceId } from '@wordpress/compose';

class EmbedSrc extends Component {

	componentDidMount() {
		const { width, height, type, id, instanceId } = this.props;
		const embedClass =  'embed-twitch';
		const embedId    = `${ embedClass }-${ instanceId }`;

		// Let's just run this JS in the editor once the component mounts.
		if ( 'video' === type || 'channel' === type ) {
			try {
				new Twitch.Embed( embedId, {
					width: width,
					height: height,
					[ type ]: id,
				} );
			} catch( e ) {
				console.log( e );
			}
		}

	}

	render() {
		const { width, height, type, id, instanceId } = this.props;
		const embedClass =  'embed-twitch';
		const embedId    = `${ embedClass }-${ instanceId }`;

		if ( ! this.props.width ) {
			return <div>Loading…</div>;
		}

		// What type of embed is it?
		if ( 'video' === type || 'channel' === type ) {
			// Ugh, I wish I knew if there was a better way to run this JS.  I'm sure there's a better way to abort too.
			return (
				<div>
					<div id={ embedId } className={ embedClass }></div>
					<div dangerouslySetInnerHTML={{__html: '<script> \
						try { \
							if ( document.getElementById( "' + embedId + '" ).innerHTML !== "" ) { throw new Error( "' + embedId + ' already populated!" ); } \
							new Twitch.Embed( "' + embedId + '", { \
								width: "' + width + '", \
								height: "' + height + '", \
								' + [ type ] + ': "' + id + '", \
							} ); \
						} catch( e ) { \
							console.log( e ); \
						} \
					</script>' }} />
				</div>
			);
		} else if ( 'clip' === type ) {
			// We have to embed clips as iframes :(
			return (
				<div className='embed-twitch-iframe-wrapper'>
					<iframe src={'https://clips.twitch.tv/embed?clip=' + id } width="100%" autoPlay={false} scrolling="no" />
				</div>
			);
		} else {
			return ( <div>__( 'Sorry, this content could not be embedded.', 'embed-twitch' )</div> );
		}
	}

}

//export default EmbedSrc;
export default withInstanceId( EmbedSrc );
