import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { ItemBox, ItemContent, Chevron } from './parts';

const Container = styled(ItemBox)`
	display: flex;
	padding: 12px;

	& > * {
		flex: 0 0 auto;
	}

	& > :first-child {
		flex: 1 1 auto;
	}
`;

Item.propTypes = {
	item: PropTypes.shape({
		title: PropTypes.string,
	}).isRequired,
	searchTerm: PropTypes.string,
	onClick: PropTypes.func,
};
/**
 * @deprecated This code is retained for legacy content-backed discussions.
 */
export default function Item({ onClick, item, searchTerm }) {
	const { title } = item;
	const handleClick = useCallback(() => onClick(item), [onClick, item]);

	return (
		<Container
			data-testid="discussion-selection-item"
			onClick={handleClick}
		>
			<ItemContent
				data-testid="content"
				content={title}
				term={searchTerm}
			/>
			<Chevron />
		</Container>
	);
}
