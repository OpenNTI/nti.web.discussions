import './Image.scss';
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { isEmpty, rawContent } from '@nti/lib-commons';
import { Card } from '@nti/web-commons';

import Registry from './Registry';

const PRESENTATION_CARD = 'presentation-card';
const stop = e => (e.preventDefault(), e.stopPropagation());

export default class Image extends React.PureComponent {
	static propTypes = {
		item: PropTypes.object
	}

	state = {}

	onLoad = (e) => {
		const {clientWidth: width} = e.target;
		this.setState({width, loaded: true});
	}

	render () {
		let {item, itemprop, isSlide, parentType} = this.props.item;
		const { loaded, width } = this.state;

		let {markable} = item;

		let title = item.title;
		let caption = item.caption;

		let noDetails = isEmpty(title) && isEmpty(caption);
		let bare = noDetails && !markable && !isSlide;
		const isCard = parentType === PRESENTATION_CARD;

		//FIXME: The Item may not be an image, it could also be a video embed, a slide, or an iframe.

		const className = cx('discussuion-context-markupframe', {loading: !loaded, bare, card: isCard});
		return (
			<div itemProp={itemprop} className={className} style={{width: width || 'auto'}}>
				<img id={item.id} src={item.src} crossOrigin={item.crossorigin} onLoad={this.onLoad}/>

				{bare ? null : (
					<div className="bar" data-non-anchorable="true" data-no-anchors-within="true" unselectable="true">
						{noDetails && !markable ? null : (
							<div className="bar-cell">
								<div className="image-title" {...rawContent(title)}/>
								<div className="image-caption" {...rawContent(caption)}/>
							</div>
						)}
					</div>
				)}

				{isCard && (
					<Card
						internalOverride
						onClick={stop}
						icon={item.src}
						item={{
							title,
							desc: caption,
							icon: item.src
						}}
					/>
				)}
			</div>
		);
	}
}

Registry.register('nti-data-markupenabled')(Image);
Registry.register('nti-data-markupdisabled')(Image);
