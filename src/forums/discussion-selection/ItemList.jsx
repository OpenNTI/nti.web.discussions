import React from 'react';
import PropTypes from 'prop-types';

import HighlightedContent from './HighlightedContent';
import { filterItemsBySearchTerm } from './utils';

export default class ItemList extends React.Component {
	static propTypes = {
		items: PropTypes.arrayOf(PropTypes.object),
		headerText: PropTypes.string,
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
			<div className="content"><HighlightedContent content={item.title} term={this.props.searchTerm}/></div>
			<div className="arrow-icon"><i className="icon-chevron-right" /></div>
		</div>);
	}

	renderItems () {
		const { items, onSelect, searchTerm } = this.props;

		const filteredItems = filterItemsBySearchTerm(items, searchTerm);

		if(!filteredItems || filteredItems.length === 0) {
			return (<div className="no-results">No discussions found</div>);
		}

		return (<div>{filteredItems.map((item) => { return this.renderItem(item, onSelect); })}</div>);
	}

	renderHeader () {
		if(this.props.headerText) {
			return (<div className="header">{this.props.headerText}</div>);
		}
	}

	render () {
		return (<div className="discussion-selection-item-container">
			{this.renderHeader()}
			{this.renderItems()}
		</div>);
	}
}
