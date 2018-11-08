import React from 'react';
import PropTypes from 'prop-types';
import { Card } from '@nti/web-commons';

import Registry from './Registry';

export default
@Registry.register('application/vnd.nextthought.relatedworkref')
class RelatedWorkRef extends React.Component {
	static propTypes = {
		item: PropTypes.object.isRequired
	}

	render () {
		return (
			<div className="discussion-context-related-work-ref">
				<Card item={this.props.item} />
			</div>
		);
	}
}
