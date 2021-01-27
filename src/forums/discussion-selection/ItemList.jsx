import React from 'react';
import PropTypes from 'prop-types';

import { filterItemsBySearchTerm } from './utils';
import { ContainerBase, Empty, Header } from './parts';
import Item from './Item';

const Container = styled(ContainerBase)`
	margin-top: 30px;
`;


List.propTypes =
ItemList.propTypes = {
	items: PropTypes.arrayOf(PropTypes.object),
	headerText: PropTypes.string,
	searchTerm: PropTypes.string,
	onSelect: PropTypes.func,
	ItemCmp: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
};

ItemList.defaultProps = {
	ItemCmp: Item
};

/**
 * @deprecated This code is retained for legacy content-backed discussions.
 */
export default function ItemList ({headerText: heading, ...props}) {

	return (
		<Container data-testid="discussion-selection-item-container">
			<Header>{heading}</Header>
			<List {...props}/>
		</Container>
	);
}

function List ({ items, onSelect, searchTerm, ItemCmp }) {

	const filteredItems = filterItemsBySearchTerm(items, searchTerm);

	if(!filteredItems?.length) {
		return <Empty>No discussions found</Empty>;
	}

	return filteredItems.map((item, i) => (
		<ItemCmp
			key={i}
			item={item}
			onClick={onSelect}
			searchTerm={searchTerm}
		/>
	)
	);
}
