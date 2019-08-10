import React from 'react';

import TileGrid from '../../src/stream/grid/tile-grid/';

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

export default class TileGridTest extends React.Component {
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
				key: i,
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

		items.push({
			key: items.length + 1,
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

		const newItems = [
			{
				key: items.length + 1,
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
					<TileGrid columns={2} gap={10}>
						{items.map((item) => {
							return (
								<div key={item.key} style={item.style}>
									<img src={item.img} width="100%" />
								</div>
							);
						})}
					</TileGrid>
				</div>
			</div>
		);
	}


}