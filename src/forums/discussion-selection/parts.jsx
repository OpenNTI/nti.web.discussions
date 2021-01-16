import React from 'react';

import HighlightedContent from './HighlightedContent';


export const Empty = styled.div`
	position: relative;
	margin-bottom: 1em;
`;

export const Header = styled.div`
	margin-top: 10px;
	margin-bottom: 10px;
	font-size: 18px;
	font-weight: 600;
	color: var(--primary-grey);

	&:empty {
		display: none;
	}
`;


export const ItemBox = styled.div`
	cursor: pointer;
	width: 246px;

	/* height: 50px; */
	background: white;
	margin: 0 10px 10px 0;
	padding: 12px;
	position: relative;
	float: left;
	box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.28);
	display: flex;

	& > * { flex: 0 0 auto; }

	& > :first-child {
		flex: 1 1 auto;
	}
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
	children: <i className="icon-chevron-right" />
}))`
	position: relative;
`;

