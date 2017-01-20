import React from 'react';
import {Panel} from 'nti-modeled-content';

export default class Topic extends React.Component {
	static propTypes = {
		topic: React.PropTypes.object,
		gotoTopic: React.PropTypes.object
	}

	render () {
		const {topic} = this.props;
		const {headline, title} = topic;

		return (
			<div className="topic-participation-summary-topic">
				<h3>{title}</h3>
				<Panel body={headline.body || []} />
			</div>
		);
	}
}
