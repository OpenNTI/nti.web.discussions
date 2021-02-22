import getColumnWidth from './get-column-width';

export default function getColumnOffsets(width, columnCount, verticalGap) {
	const columnWidth = getColumnWidth(width, columnCount, verticalGap);

	const offsets = [];
	let pointer = 0;

	for (let i = 0; i < columnCount; i++) {
		offsets.push(pointer);
		pointer += columnWidth + verticalGap;
	}

	return offsets;
}
