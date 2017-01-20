import React from 'react';

export default class Topic extends React.Component {
	static propTypes = {
		topic: React.PropTypes.object,
		gotoTopic: React.PropTypes.object
	}

	render () {
		return (
			<div className="topic-summary">
				<span>Topic</span>
			</div>
		);
	}
}
