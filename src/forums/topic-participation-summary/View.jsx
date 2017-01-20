import React from 'react';
import {getService} from 'nti-web-client';
import {Loading} from 'nti-web-commons';

import Topic from './Topic';
import Participation from './Participation';

export default class TopicSummary extends React.Component {
	static propTypes = {
		topicID: React.PropTypes.string,
		userID: React.PropTypes.string,
		gotoTopic: React.PropTypes.func,
		gotoComment: React.PropTypes.func
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
			});
	}


	render () {
		const {gotoTopic, gotoComment, userID} = this.props;
		const {loading, topic, participation} = this.state;

		return (
			<div className="topic-participation-summary">
				{loading && (<Loading.Mask />)}
				{!loading && topic && (<Topic topic={topic} gotoTopic={gotoTopic}/>)}
				{!loading && participation && (<Participation userID={userID} participation={participation} gotoComment={gotoComment} />)}
			</div>
		);
	}
}
