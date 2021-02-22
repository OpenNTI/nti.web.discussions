import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import HighlightedContent from './HighlightedContent';
import { ItemBox } from './parts';

export const Avatar = styled('div').attrs(({ src, style, ...props }) => ({
	'data-testid': 'discussion-selection-avatar',
	style: {
		...style,
		backgroundImage: `url("${
			src || '/app/resources/images/elements/discussion-icon.png'
		}")`,
	},
	...props,
}))`
	height: 120px;
	width: 246px;
	background-repeat: no-repeat;
	background-size: cover;
	background-position: center;
`;

export const Title = styled(HighlightedContent).attrs({
	'data-testid': 'discussion-selection-topic-title',
})`
	color: var(--primary-grey);
	font: normal 300 26px var(--header-font-family);
	font-stretch: condensed;
	padding: 4px;
	padding-top: 3px;
	text-overflow: ellipsis;
	overflow: hidden;
	background-color: white;
	width: 246px;
	height: 80px;

	@supports (display: -webkit-box) {
		/* autoprefixer: off */
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}
`;

export const Container = styled(ItemBox)`
	height: 200px;

	&.selected {
		outline: solid 2px var(--primary-blue) !important;
	}
`;

Topic.propTypes = {
	onClick: PropTypes.func,
	searchTerm: PropTypes.string,
	selectedTopics: PropTypes.object,
	topic: PropTypes.object.isRequired,
};

/**
 * @deprecated This code is retained for legacy content-backed discussions.
 */
export default function Topic({ onClick, topic, selectedTopics, searchTerm }) {
	const handleClick = useCallback(() => onClick(topic), [onClick, topic]);

	return (
		<Container selected={selectedTopics.has(topic)} onClick={handleClick}>
			<Avatar src={topic.icon} />
			<Title content={topic.title} term={searchTerm} />
		</Container>
	);
}
