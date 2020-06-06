import React from 'react';
import PropTypes from 'prop-types';
import {Viewer} from '@nti/web-modeled-content';
import {Button} from '@nti/web-commons';
import {scoped} from '@nti/lib-locale';

const DEFAULT_TEXT = {
	join: 'Join the Discussion'
};

const t = scoped('discussions.topic-parcitipation-summary.Topic', DEFAULT_TEXT);

export default class Topic extends React.Component {
	static propTypes = {
		topic: PropTypes.object,
		gotoTopic: PropTypes.func
	}


	onJoin = () => {
		const {gotoTopic, topic} = this.props;

		if (gotoTopic) {
			gotoTopic(topic);
		}
	}

	render () {
		const {topic} = this.props;
		const {headline, title} = topic;

		return (
			<div className="topic-participation-summary-topic">
				<div className="header">
					<h3>{title}</h3>
					<Button onClick={this.onJoin}>
						<span>{t('join')}</span>
					</Button>
				</div>
				<Viewer body={headline.body || []} />
			</div>
		);
	}
}
