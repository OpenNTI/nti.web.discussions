export default function getColumnWidth(width, columnCount, verticalGap) {
	const totalGapWidth = verticalGap * (columnCount - 1);

	return Math.floor((width - totalGapWidth) / columnCount);
}
