import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { DisplayName, Avatar } from 'nti-web-commons';

export default class TopicList extends React.Component {
	static propTypes = {
		topics: PropTypes.arrayOf(PropTypes.object),
		onTopicSelect: PropTypes.func,
		selectedTopics: PropTypes.object
	}

	constructor (props) {
		super(props);
	}

	renderTopic (topic, onTopicSelect) {
		const clickHandler = () => { onTopicSelect(topic); };

		let className = cx({
			'discussion-selection-topic': true,
			'selected': this.props.selectedTopics.has(topic)
		});

		return (<div key={topic.Creator + '--' + topic.title} className={className} onClick={clickHandler}>
			<Avatar className="discussion-selection-avatar" entityId={topic.Creator}/>
			<div className="discussion-selection-topic-author"><DisplayName entityId={topic.Creator}/></div>
			<div className="discussion-selection-topic-title">{topic.title}</div>
		</div>);
	}

	render () {
		const { topics, onTopicSelect } = this.props;

		if(!topics || topics.length === 0) {
			return (<div className="no-results">No discussions found</div>);
		}

		return (<div className="discussion-selection-topic-list">
			{topics.map((topic) => { return this.renderTopic(topic, onTopicSelect); })}
		</div>);
	}
}
