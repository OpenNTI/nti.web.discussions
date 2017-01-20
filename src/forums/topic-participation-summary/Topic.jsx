import React from 'react';
import {Panel} from 'nti-modeled-content';
import {Button} from 'nti-web-commons';
import {scoped} from 'nti-lib-locale';

const DEFAULT_TEXT = {
	join: 'Join the Discussion'
};

const t = scoped('TOPIC_PARTICIPATION_SUMMARY_TOPIC', DEFAULT_TEXT);

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
				<div className="header">
					<h3>{title}</h3>
					<Button>
						<span>{t('join')}</span>
					</Button>
				</div>
				<Panel body={headline.body || []} />
			</div>
		);
	}
}
