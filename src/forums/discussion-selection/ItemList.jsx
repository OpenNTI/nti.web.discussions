import './ItemList.scss';
import React from 'react';
import PropTypes from 'prop-types';

import { filterItemsBySearchTerm } from './utils';
import Item from './Item';

export default class ItemList extends React.Component {
	static propTypes = {
		items: PropTypes.arrayOf(PropTypes.object),
		headerText: PropTypes.string,
		searchTerm: PropTypes.string,
		onSelect: PropTypes.func,
		ItemCmp: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
	}

	static defaultProps = {
		ItemCmp: Item
	}

	renderItems () {
		const { items, onSelect, searchTerm, ItemCmp } = this.props;

		const filteredItems = filterItemsBySearchTerm(items, searchTerm);

		if(!filteredItems || filteredItems.length === 0) {
			return <div className="no-results">No discussions found</div>;
		}

		return filteredItems.map(item => <ItemCmp key={item.title} item={item} onClick={onSelect} searchTerm={searchTerm} />);
	}

	render () {
		const { headerText } = this.props;
		return (
			<div className="discussion-selection-item-container">
				{headerText && <div className="header">{headerText}</div>}
				{this.renderItems()}
			</div>
		);
	}
}
