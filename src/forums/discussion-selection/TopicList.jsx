import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { filterItemsBySearchTerm } from './utils';
import HighlightedContent from './HighlightedContent';

export default class TopicList extends React.Component {
	static propTypes = {
		topics: PropTypes.arrayOf(PropTypes.object),
		searchTerm: PropTypes.string,
		headerText: PropTypes.string,
		onTopicSelect: PropTypes.func,
		selectedTopics: PropTypes.object
	}

	constructor (props) {
		super(props);
	}

	renderTopic (topic, onTopicSelect, searchTerm) {
		const clickHandler = () => { onTopicSelect(topic); };

		let className = cx({
			'discussion-selection-topic': true,
			'selected': this.props.selectedTopics.has(topic)
		});

		const img = topic.get && topic.get('icon')
			? topic.get('icon')
			: '/app/resources/images/elements/discussion-icon.png';

		return (<div key={topic.Creator + '--' + topic.title} className={className} onClick={clickHandler}>
			<div className="discussion-selection-avatar" style={{
				backgroundImage: 'url("' + img + '")'
			}}/>
			<div className="discussion-selection-topic-title"><HighlightedContent content={topic.title} term={searchTerm}/></div>
		</div>);
	}

	renderTopics () {
		const { topics, onTopicSelect, searchTerm } = this.props;

		const filteredTopics = filterItemsBySearchTerm(topics, searchTerm);

		if(!filteredTopics || filteredTopics.length === 0) {
			return (<div className="no-results">No discussions found</div>);
		}

		return (<div>{filteredTopics.map((topic) => { return this.renderTopic(topic, onTopicSelect, searchTerm); })}</div>);
	}

	renderHeader () {
		if(this.props.headerText) {
			return (<div className="header">{this.props.headerText}</div>);
		}
	}

	render () {
		return (<div className="discussion-selection-topic-list">
			{this.renderHeader()}
			{this.renderTopics()}
		</div>);
	}
}
