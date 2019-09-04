import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {restProps} from '@nti/lib-commons';
import {Monitor} from '@nti/web-commons';

import Styles from './View.css';
import {updateTilePositions, getColumnPercentage} from './utils';

const cx = classnames.bind(Styles);

const TILE_ITEM_ATTRIBUTE = 'data-tile';
const CHILD_SELECTOR = `[${TILE_ITEM_ATTRIBUTE}]`;

export default class ItemGrid extends React.Component {
	static propTypes = {
		className: PropTypes.string,

		renderItem: PropTypes.func.isRequired,
		items: PropTypes.arrayOf(
			PropTypes.shape({
				getID: PropTypes.func
			})
		),

		children: PropTypes.any,

		columns: PropTypes.number,
		gap: PropTypes.oneOfType([
			PropTypes.number,
			PropTypes.shape({
				vertical: PropTypes.number,
				horizontal: PropTypes.number
			})
		])
	}

	attachMonitor = x => this.monitor = x;
	state = {tilePositions: {}}

	get gap () {
		const {gap = 0} = this.props;

		if (gap.vertical && gap.horizontal) { return gap; }

		return {
			vertical: gap,
			horizontal: gap
		};
	}

	get columnCount () {
		const {columns} = this.props;

		return columns || 1;
	}

	get tiles () {
		if (!this.monitor) { return null; }

		const children = this.monitor.querySelectorAll(CHILD_SELECTOR);
		const list = Array.from(children);
		const heights = this.heightMap;

		return list
			.map(item => {
				const id = item.getAttribute(TILE_ITEM_ATTRIBUTE);
			
				return {
					id,
					height: heights[id]
				};
			});
	}

	onItemHeightChange = (li, height) => {
		this.heightMap = this.heightMap || {};

		const id = li.getAttribute(TILE_ITEM_ATTRIBUTE);

		if (height == null) {
			delete this.heightMap[id];
		} else {
			this.heightMap[id] = height;
		}

		if (!this.updateTimeout) {
			this.updateTimeout = setTimeout(() => {
				delete this.updateTimeout;
				this.updateTileLayout();
			}, 100);
		}
	}

	updateTileLayout () {
		if (!this.monitor) { return; }

		const {tilePositions: oldPositions} = this.state;
		const {tiles, columnCount, gap: {vertical, horizontal}} = this;
		const width = this.monitor.clientWidth;

		const {tilePositions, containerHeight} = updateTilePositions(tiles, oldPositions, {
			width,
			columnCount,
			verticalGap: vertical,
			horizontalGap: horizontal
		});

		this.setState({
			tilePositions,
			containerHeight
		});
	}


	render () {
		const {className} = this.props;
		const {containerHeight} = this.state;
		const otherProps = restProps(ItemGrid, this.props);

		return (
			<Monitor.ChildHeight
				{...otherProps}
				as="ul"
				ref={this.attachMonitor}
				className={cx('nti-item-grid', className)}
				childSelector={CHILD_SELECTOR}
				onHeightChange={this.onItemHeightChange}
				style={{minHeight: `${containerHeight || 0}px`}}
			>
				{this.renderChildren()}
			</Monitor.ChildHeight>
		);
	}


	renderChildren () {
		const {items, renderItem, columns} = this.props;
		const {tilePositions} = this.state;
		const columnWidthGuess = getColumnPercentage(columns, this.gap.vertical);

		return items
			.map((item) => {
				const key = item.getID();
				const itemCmp = renderItem(item);

				if (!itemCmp) { return null; }

				const position = tilePositions[key];

				const listAttributes = {
					className: cx('item-tile', {computing: !position}),
					key,
					[TILE_ITEM_ATTRIBUTE]: key,
					style: !position ?
						{width: `${columnWidthGuess}`} :
						{top: `${position.topOffset}px`, left: `${position.columnOffset}px`, width: `${position.width}px`}
				};

				return (
					<li  key={key} {...listAttributes}>
						{renderItem(item)}
					</li>
				);
			})
			.filter(Boolean);
	}
}