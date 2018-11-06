import React from 'react';
import PropTypes from 'prop-types';

import Registry from './Registry';

export default
@Registry.register('application/vnd.nextthought.slide')
class Slide extends React.PureComponent {
	static propTypes = {
		item: PropTypes.shape({
			image: PropTypes.string.isRequired
		}).isRequired
	}

	render () {
		const { item: { image } } = this.props;

		return (
			<div className="discussuion-context-slide">
				<div className="content-launcher">
					<div className="image-wrap">
						<img src={image} />
					</div>
				</div>
			</div>
		);
	}
}
