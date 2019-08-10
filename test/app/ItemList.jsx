import React from 'react';

import ItemList from '../../src/stream/list/item-list/';

const COLORS = [
	'orange', 
	'red',
	'green',
	'blue',
	'yellow',
	'pink'
];

const GROUP_INFO = {
	'orange': {label: 'Orange Group', className: 'orange-class', labelClassName: 'orange-label-class', itemListClassName: 'orange-item-list-class'},
	'red': {label: 'Red Group', className: 'red-class', labelClassName: 'red-label-class'},
	'green': {label: 'Green Group', className: 'green-class', labelClassName: 'green-label-class'},
	'blue': {label: 'Blue Group', className: 'blue-class', labelClassName: 'blue-label-class'},
	'yellow': {label: 'Yellow Group', className: 'yellow-class', labelClassName: 'yellow-label-class'},
	'pink': {label: 'Pink Group', className: 'pink-class', labelClassName: 'pink-label-class'},
};


const initialItems = Array
	.from({length: 100})
	.map((_, i) => {
		return {
			index: i,
			getID: () => i,
			color: COLORS[Math.floor(Math.random() * COLORS.length)],
			text: `ITEM ${i}`
		};
	});

function getGroupInfo (group) {
	return GROUP_INFO[group];
}

function groupByColor (item) {
	return item.color;
}

function groupByMod (item) {
	return item.index % 5;
}

export default class ItemListTest extends React.Component {
	state = {grouper: null, items: [...initialItems]}

	setColorGroup = (e) => {
		const {grouper} = this.state;

		this.setState({
			grouper: grouper === groupByColor ? null : groupByColor
		});
	}

	setModGroup = (e) => {
		const {grouper} = this.state;

		this.setState({
			grouper: grouper === groupByMod ? null : groupByMod
		});
	}


	render () {
		const {grouper, items} = this.state;

		return (
			<div>
				<label>
					<input type="checkbox" checked={grouper === groupByColor} onChange={this.setColorGroup}/>
					<span>Group By Color</span>
				</label>
				<label>
					<input type="checkbox" checked={grouper === groupByMod} onChange={this.setModGroup} />
					<span>Group By Mod 5</span>
				</label>

				<ItemList
					items={items}
					renderItem={this.renderItem}
					grouper={grouper}
					getGroupInfo={getGroupInfo}
				/>
			</div>
		);
	}


	renderItem = (item) => {
		return (
			<div style={{background: item.color, padding: '1rem', border: '1px solid black'}}>
				{item.text}
			</div>
		);
	}
}