import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {restProps} from '@nti/lib-commons';
import {Monitor} from '@nti/web-commons';

import Styles from './View.css';
import {updateTilePositions} from './utils';

const cx = classnames.bind(Styles);

const TILE_ITEM_ATTRIBUTE = 'data-tile';
const CHILD_SELECTOR = `[${TILE_ITEM_ATTRIBUTE}]`;

export default class TileGrid extends React.Component {
	static propTypes = {
		className: PropTypes.string,
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

		return list.map(item => {
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

		this.heightMap[id] = height;

		if (!this.updateTimeout) {
			this.updateTimeout = setTimeout(() => this.updateTileLayout(), 100);
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
		const otherProps = restProps(TileGrid, this.props);

		return (
			<Monitor.ChildHeight
				{...otherProps}
				ref={this.attachMonitor}
				className={cx('nti-tile-grid', className)}
				childSelector={CHILD_SELECTOR}
				onHeightChange={this.onItemHeightChange}
				style={{minHeight: `${containerHeight || 0}px`}}
			>
				{this.renderChildren()}
			</Monitor.ChildHeight>
		);
	}


	renderChildren () {
		const {children} = this.props;
		const {tilePositions} = this.state;

		return React.Children.map(children, (child) => {
			const key = child.key;
			const name = `${key}-tile`;

			const position = tilePositions[name];

			const listAttributes = {
				className: cx('tile', {computing: !position}),
				key: name,
				[TILE_ITEM_ATTRIBUTE]: name,
				style: !position ?
					null :
					{top: `${position.topOffset}px`, left: `${position.columnOffset}px`, width: `${position.width}px`}

			};

			return (
				<div {...listAttributes} >
					{child}
				</div>
			);
		});
	}
}