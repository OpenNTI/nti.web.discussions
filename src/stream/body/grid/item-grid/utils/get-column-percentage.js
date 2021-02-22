export default function getColumnPercentage(columnCount, verticalGap) {
	const totalGapWidth = verticalGap * (columnCount - 1);

	return `calc((100% - ${totalGapWidth}px) / ${columnCount})`;
}
