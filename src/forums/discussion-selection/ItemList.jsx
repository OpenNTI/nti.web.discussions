import React from 'react';
import PropTypes from 'prop-types';

import HighlightedContent from './HighlightedContent';
import { filterItemsBySearchTerm } from './utils';

export default class ItemList extends React.Component {
	static propTypes = {
		items: PropTypes.arrayOf(PropTypes.object),
		searchTerm: PropTypes.string,
		onSelect: PropTypes.func
	}

	constructor (props) {
		super(props);
	}

	renderItem (item, onSelect) {
		const clickHandler = () => {
			onSelect(item);
		};

		return (<div key={item.title} className="discussion-selection-item" onClick={clickHandler}>
			<HighlightedContent content={item.title} term={this.props.searchTerm}/>
		</div>);
	}

	render () {
		const { items, onSelect, searchTerm } = this.props;

		const filteredItems = filterItemsBySearchTerm(items, searchTerm);

		if(filteredItems) {
			return (<div className="discussion-selection-item-container">
				{filteredItems.map((item) => { return this.renderItem(item, onSelect); })}
			</div>);
		}
	}
}
