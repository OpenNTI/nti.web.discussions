import React from 'react';
import PropTypes from 'prop-types';

import Registry from './Registry';

export default
@Registry.register('application/vnd.nextthought.napoll')
class PollContext extends React.Component {
	static propTypes = {
		item: PropTypes.shape({
			content: PropTypes.string.isRequired,
			getID: PropTypes.func.isRequired
		}).isRequired
	}

	shouldComponentUpdate = (nextProps, nextState) => {
		if (this.props.item.getID() === nextProps.item.getID()) {
			return false;
		}

		return true;
	}


	render () {
		return (
			<div className="discussion-context-poll">
				{this.props.item.content}
			</div>
		);
	}
}
