import PropTypes from 'prop-types';

import { filterItemsBySearchTerm } from './utils';
import Topic from './Topic';
import { Header, Empty, ContainerBase } from './parts';

const Container = styled(ContainerBase)`
	min-height: 300px;
`;

List.propTypes = TopicList.propTypes = {
	topics: PropTypes.arrayOf(PropTypes.object),
	searchTerm: PropTypes.string,
	headerText: PropTypes.string,
	onTopicSelect: PropTypes.func,
	selectedTopics: PropTypes.object,
	emptyMessage: PropTypes.string,
};

/**
 * @param root0
 * @param root0.headerText
 * @deprecated This code is retained for legacy content-backed discussions.
 */
export default function TopicList({ headerText: heading, ...props }) {
	return (
		<Container data-testid="discussion-selection-topic-list">
			<Header>{heading}</Header>
			<List {...props} />
		</Container>
	);
}

function List({ topics, onTopicSelect, searchTerm, emptyMessage, ...props }) {
	const filteredTopics = filterItemsBySearchTerm(topics, searchTerm);

	return (
		<>
			{!filteredTopics?.length && (
				<Empty data-testid="no-results">{emptyMessage}</Empty>
			)}

			{filteredTopics?.map((topic, i) => (
				<Topic
					key={i}
					topic={topic}
					onClick={onTopicSelect}
					searchTerm={searchTerm}
					{...props}
				/>
			))}
		</>
	);
}
