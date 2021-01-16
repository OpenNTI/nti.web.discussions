import React, {useCallback} from 'react';
import PropTypes from 'prop-types';

import {ItemBox, ItemContent, Chevron} from './parts';

Item.propTypes = {
	item: PropTypes.shape({
		title: PropTypes.string
	}).isRequired,
	searchTerm: PropTypes.string,
	onClick: PropTypes.func,
};
export default function Item ({onClick, item, searchTerm}) {
	const { title } = item;
	const handleClick = useCallback(() => onClick(item), [onClick, item]);

	return (
		<ItemBox data-testid="discussion-selection-item" onClick={handleClick}>
			<ItemContent data-testid="content" content={title} term={searchTerm} />
			<Chevron/>
		</ItemBox>
	);

}
