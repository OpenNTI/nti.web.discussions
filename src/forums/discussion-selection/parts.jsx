import React from 'react';

import HighlightedContent from './HighlightedContent';

export const ContainerBase = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 10px;
	align-items: flex-start;
	align-content: flex-start;

	& > * {
		flex: 0 0 auto;
	}
`;

export const Empty = styled.div`
	position: relative;
	margin-bottom: 1em;
	flex: 0 0 100%;
`;

export const Header = styled.div`
	margin: 10px 0 0;
	font-size: 18px;
	font-weight: 600;
	color: var(--primary-grey);
	flex: 0 0 100%;

	&:empty {
		display: none;
	}
`;

export const ItemBox = styled.div`
	cursor: pointer;
	width: 246px;

	/* height: 50px; */
	background: white;
	position: relative;
	box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.28);
`;

export const ItemContent = styled(HighlightedContent)`
	position: relative;
	overflow: hidden;
	text-overflow: ellipsis;
	width: calc(100% - 30px);
	white-space: nowrap;
`;

export const Chevron = styled('div').attrs(props => ({
	...props,
	children: React.createElement('i', { className: 'icon-chevron-right' }),
}))`
	position: relative;
`;
