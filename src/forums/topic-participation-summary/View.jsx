import React from 'react';
import PropTypes from 'prop-types';
import {getService} from '@nti/web-client';
import {Loading, EmptyState} from '@nti/web-commons';
import {scoped} from '@nti/lib-locale';

import Topic from './Topic';
import Participation from './Participation';

const DEFAULT_TEXT = {
	noAccess: 'You do not have access to this discussion.'
};

const t = scoped('discussions.topic-parcitipation-summary.View', DEFAULT_TEXT);

export default class TopicSummary extends React.Component {
	static propTypes = {
		topicID: PropTypes.string,
		userID: PropTypes.string,
		gotoTopic: PropTypes.func,
		gotoComment: PropTypes.func
	}


	constructor (props) {
		super(props);

		this.state = {
			loading: true,
			topic: null,
			participation: null
		};
	}


	componentDidMount () {
		const {topicID} = this.props;

		this.loadTopic(topicID);
	}


	componentWillUnmount () {
		this.unmounted = true;
	}


	refresh () {
		const {topicID} = this.props;

		this.loadTopic(topicID);
	}


	loadTopic (topicID) {
		const {userID} = this.props;

		if (!topicID) {
			this.setState({
				loading: false
			});

			return;
		}

		this.setState({
			loading: true
		});

		getService()
			.then(s => s.getObject(topicID))
			.then((topic) => {
				topic.loadUserSummary(userID)
					.then((participation) => {
						if (!this.unmounted) {
							this.setState({
								loading: false,
								topic,
								participation
							});
						}
					})
					.catch(() => {
						if (!this.unmounted) {
							this.setState({
								loading: false,
								topic
							});
						}
					});
			})
			.catch(() => {
				this.setState({
					loading: false
				});
			});
	}


	render () {
		const {gotoTopic, gotoComment, userID} = this.props;
		const {loading, topic, participation} = this.state;

		return (
			<div className="topic-participation-summary">
				{loading && (<Loading.Mask />)}
				{!loading && !topic && (<EmptyState header={t('noAccess')} />)}
				{!loading && topic && (<Topic topic={topic} gotoTopic={gotoTopic}/>)}
				{!loading && participation && (<Participation userID={userID} participation={participation} gotoComment={gotoComment} />)}
			</div>
		);
	}
}
