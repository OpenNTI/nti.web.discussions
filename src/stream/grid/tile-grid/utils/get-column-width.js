export default function getColumnWidth (width, columnCount, verticalGap) {
	debugger;
	const totalGapWidth = verticalGap * (columnCount - 1);
	
	return Math.floor((width - totalGapWidth) / columnCount);
}