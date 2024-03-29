import React from 'react';

import ItemGrid from '../../src/stream/grid/item-grid/';

const HEIGHTS = [
	'100px',
	'50px',
	'200px'
];

const COLORS = [
	'orange', 
	'red',
	'green',
	'blue',
	'yellow',
	'pink'
];

const IMAGES = [
	'http://placekitten.com/g/200/300',
	'http://placekitten.com/g/500/500'
];

export default class ItemGridTest extends React.Component {
	state = {items: [], itemCount: 100}

	componentDidMount () {
		// this.applyItemCount();
	}

	changeItemCount = (e) => {
		this.setState({
			itemCount: e.taget.value
		});
	}


	applyItemCount = () => {
		const {itemCount} = this.state;
		const count = parseInt(itemCount, 10);

		const items = [];

		for (let i = 0; i < count; i++) {
			items.push({
				getID: () => i,
				img: IMAGES[Math.floor(Math.random() * IMAGES.length)],
				style: {
					minHeight: HEIGHTS[Math.floor(Math.random() * HEIGHTS.length)],
					backgroundColor: COLORS[Math.floor(Math.random() * COLORS.length)]
				}
			});
		}

		this.setState({
			items
		});
	}


	addTile = () => {
		const {items} = this.state;
		const id = items.length + 1;

		items.push({
			getID: () => id,
			img: IMAGES[Math.floor(Math.random() * IMAGES.length)],
			style: {
				minHeight: HEIGHTS[Math.floor(Math.random() * HEIGHTS.length)],
				backgroundColor: COLORS[Math.floor(Math.random() * COLORS.length)]
			}
		});

		this.setState({
			itemCount: items.length,
			items
		});
	}

	prependTile = () => {
		const {items} = this.state;
		const id = items.length + 1;

		const newItems = [
			{
				getID: () => id,
				img: IMAGES[Math.floor(Math.random() * IMAGES.length)],
				style: {
					minHeight: HEIGHTS[Math.floor(Math.random() * HEIGHTS.length)],
					backgroundColor: COLORS[Math.floor(Math.random() * COLORS.length)]
				}
			},
			...items
		];

		this.setState({
			items: newItems,
			itemCount: newItems.length
		});
	}


	render () {
		const {itemCount, items} = this.state;

		return (
			<div>
				<div>
					<input type="number" value={itemCount} onChange={this.changeItemCount} />
					<button onClick={this.applyItemCount}>
						Set Tile Number
					</button>
					<button onClick={this.addTile}>
						Append Tile
					</button>
					<button onClick={this.prependTile}>
						Prepend Tile
					</button>
				</div>
				<div style={{width: '720px'}}>
					<ItemGrid
						columns={2}
						gap={3}
						items={items}
						renderItem={this.renderItem}
					/>
				</div>
			</div>
		);
	}


	renderItem = (item) => {
		return (
			<div style={item.style}>
				<img src={item.img} width="100%" />
			</div>
		);
	}


}