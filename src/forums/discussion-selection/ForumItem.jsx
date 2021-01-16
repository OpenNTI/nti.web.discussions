import React, {useCallback} from 'react';
import PropTypes from 'prop-types';

import {ItemBox, ItemContent, Chevron} from './parts';

ForumItem.propTypes = {
	item: PropTypes.shape({
		title: PropTypes.string,
		get: PropTypes.func.isRequired
	}).isRequired,
	searchTerm: PropTypes.string,
	onClick: PropTypes.func,
};

export default function ForumItem ({ item, onClick, searchTerm }) {
	const { title } = item;
	const handleClick = useCallback(() => onClick(item), [onClick, item]);

	return (
		<ItemBox data-testid="discussion-selection-item" onClick={handleClick}>
			<ItemContent data-testid="content"
				content={item.get('displayTitle') || title}
				term={searchTerm}
			/>
			<Chevron/>
		</ItemBox>
	);

}
