import getColumnOffsets from './get-column-offsets';
import getColumnWidth from './get-column-width';

export default function updateTilePositions (tiles, positions = {}, sizing) {
	const {columnCount, width, horizontalGap, verticalGap} = sizing;
	const columnWidth = getColumnWidth(width, columnCount, verticalGap);
	const offsets = getColumnOffsets(width, columnCount, verticalGap);
	const columnHeights = offsets.reduce((acc, o) => ({...acc, [o]: 0}), {});

	const getShortestOffset = () => {
		let min = offsets[0];

		for (let offset of offsets) {
			if (columnHeights[offset] < columnHeights[min]) {
				min = offset;
			}
		}

		return min;
	};

	const createPosition = (tile) => {
		const columnOffset = getShortestOffset();
		const topOffset = columnHeights[columnOffset];

		columnHeights[columnOffset] += tile.height + horizontalGap;

		return {
			columnOffset,
			topOffset,
			width: columnWidth
		};
	};

	const updatePosition = (tile, position) => {
		const {columnOffset} = position;

		//If the tile was positioned at an invalid offset just start from scratch
		if (offsets.indexOf(columnOffset) < 0) { return createPosition(tile); }

		const topOffset = columnHeights[columnOffset];

		columnHeights[columnOffset] += tile.height + horizontalGap;

		return {
			columnOffset,
			topOffset,
			width: columnWidth
		};
	};

	const newPositions = {};

	for (let tile of tiles) {
		newPositions[tile.id] = positions[tile.id] ?
			updatePosition(tile, positions[tile.id]) :
			createPosition(tile);
	}

	return {
		tilePositions: newPositions,
		containerHeight: Math.max(...Object.values(columnHeights))
	};
}
