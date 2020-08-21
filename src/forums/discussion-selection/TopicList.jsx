import './TopicList.scss';
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { filterItemsBySearchTerm } from './utils';
import HighlightedContent from './HighlightedContent';



class Topic extends React.Component {
	static propTypes = {
		onClick: PropTypes.func,
		searchTerm: PropTypes.string,
		selectedTopics: PropTypes.object,
		topic: PropTypes.object,
	}

	onClick = () => this.props.onClick(this.props.topic)

	render () {
		const {topic, selectedTopics, searchTerm} = this.props;

		const className = cx({
			'discussion-selection-topic': true,
			'selected': selectedTopics.has(topic)
		});

		const img = topic.get && topic.get('icon')
			? topic.get('icon')
			: '/app/resources/images/elements/discussion-icon.png';

		return (
			<div className={className} onClick={this.onClick}>
				<div className="discussion-selection-avatar" style={{
					backgroundImage: `url("${img}")`
				}}/>
				<div className="discussion-selection-topic-title">
					<HighlightedContent content={topic.title} term={searchTerm}/>
				</div>
			</div>
		);
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


	renderTopics () {
		const { topics, onTopicSelect, searchTerm, ...props } = this.props;

		const filteredTopics = filterItemsBySearchTerm(topics, searchTerm);

		if(!filteredTopics || filteredTopics.length === 0) {
			return (<div className="no-results">No discussions found</div>);
		}

		return (
			<div>
				{filteredTopics.map(topic => (
					<Topic key={topic.Creator + '--' + topic.title}
						topic={topic}
						onClick={onTopicSelect}
						searchTerm={searchTerm}
						{...props}
					/>
				))}
			</div>
		);
	}

	renderHeader () {
		if(this.props.headerText) {
			return (
				<div className="header">{this.props.headerText}</div>
			);
		}
	}

	render () {
		return (
			<div className="discussion-selection-topic-list">
				{this.renderHeader()}
				{this.renderTopics()}
			</div>
		);
	}
}
