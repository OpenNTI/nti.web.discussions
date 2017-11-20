import React from 'react';
import PropTypes from 'prop-types';

import HighlightedContent from './HighlightedContent';
import { filterItemsBySearchTerm } from './utils';

class Item extends React.Component {
	static propTypes = {
		item: PropTypes.object.isRequired,
		searchTerm: PropTypes.string,
		onClick: PropTypes.func
	}

	constructor (props) {
		super(props);
	}

	onItemClick = () => {
		const { item, onClick } = this.props;

		onClick && onClick(item);
	};

	render () {
		const { item, searchTerm } = this.props;

		return (<div key={item.title} className="discussion-selection-item" onClick={this.onItemClick}>
			<div className="content"><HighlightedContent content={item.title} term={searchTerm}/></div>
			<div className="arrow-icon"><i className="icon-chevron-right" /></div>
		</div>);
	}
}

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

	onItemClick = (item) => {
		const { onSelect } = this.props;

		onSelect && onSelect(item);
	};

	renderItem (item, onSelect) {
		return (
			<Item key={item.title}
				item={item}
				onClick={this.onItemClick}
				searchTerm={this.props.searchTerm}
			/>
		);
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
