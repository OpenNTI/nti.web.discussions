import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { filterItemsBySearchTerm } from './utils';
import HighlightedContent from './HighlightedContent';

class Topic extends React.Component {
	static propTypes = {
		topic: PropTypes.object.isRequired,
		onClick: PropTypes.func,
		searchTerm: PropTypes.string,
		selected: PropTypes.bool
	}

	constructor (props) {
		super(props);
	}

	onTopicClick = () => {
		const { topic, onClick } = this.props;

		onClick && onClick(topic);
	}

	render () {
		const { topic, selected, searchTerm } = this.props;

		const cls = cx('discussion-selection-topic', { selected });

		const img = topic.get && topic.get('icon')
			? topic.get('icon')
			: '/app/resources/images/elements/discussion-icon.png';

		return (<div key={topic.Creator + '--' + topic.title} className={cls} onClick={this.onTopicClick}>
			<div className="discussion-selection-avatar" style={{
				backgroundImage: 'url("' + img + '")'
			}}/>
			<div className="discussion-selection-topic-title"><HighlightedContent content={topic.title} term={searchTerm}/></div>
		</div>);
	}
}


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

	onTopicClick = (topic) => {
		const { onTopicSelect } = this.props;

		onTopicSelect && onTopicSelect(topic);
	}

	renderTopic (topic, onTopicSelect, searchTerm) {
		const { selectedTopics } = this.props;

		return (
			<Topic key={topic.Creator + '--' + topic.title}
				topic={topic}
				onClick={this.onTopicClick}
				searchTerm={searchTerm}
				selected={selectedTopics.has(topic)}
			/>
		);
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
