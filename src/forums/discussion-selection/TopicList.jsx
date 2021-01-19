import React from 'react';
import PropTypes from 'prop-types';

import { filterItemsBySearchTerm } from './utils';
import Topic from './Topic';
import NewTopic from './NewTopic';
import {Header, Empty, ContainerBase} from './parts';

const empty = x => !x || x === '';

const Container = styled(ContainerBase)`
	min-height: 300px;
`;

List.propTypes =
TopicList.propTypes = {
	topics: PropTypes.arrayOf(PropTypes.object),
	searchTerm: PropTypes.string,
	headerText: PropTypes.string,
	onTopicSelect: PropTypes.func,
	selectedTopics: PropTypes.object
};

export default function TopicList ({headerText: heading, ...props}) {

	return (
		<Container data-testid="discussion-selection-topic-list">
			<Header>{heading}</Header>
			<List {...props}/>
		</Container>
	);
}


function List ({ topics, onTopicSelect, searchTerm, ...props }) {

	const filteredTopics = filterItemsBySearchTerm(topics, searchTerm);

	return (
		<>
			{ !filteredTopics?.length && (
				<Empty data-testid="no-results">No discussions found</Empty>
			)}

			{empty(searchTerm) && <NewTopic /> }

			{filteredTopics?.map(topic => (
				<Topic key={topic.Creator + '--' + topic.title}
					topic={topic}
					onClick={onTopicSelect}
					searchTerm={searchTerm}
					{...props}
				/>
			))}
		</>
	);
}
