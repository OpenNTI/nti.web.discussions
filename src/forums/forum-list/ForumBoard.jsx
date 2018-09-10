import React from 'react';
import PropTypes from 'prop-types';
import { scoped } from '@nti/lib-locale';

import ForumItem from './ForumItem';

const DEFAULT_TEXT = {
	Section: 'My Section',
	Parent: 'All Sections'
};

const t = scoped('forums.groups.groupings', DEFAULT_TEXT);

export default function ForumBoard ({ title, board, activeForum }) {
	const forums = (board || {}).forums || [];
	return (
		<li className="board">
			<h3 className="board-title">{title ? t(title) : ''}</h3>
			<ul className="forum-item-list">
				{forums.map(forum => <ForumItem item={forum} key={forum.getID()} isActive={activeForum === forum.getID()} />) }
			</ul>
		</li>
	);
}

ForumBoard.propTypes = {
	board: PropTypes.object.isRequired,
	title: PropTypes.string.isRequired,
	activeForum: PropTypes.string
};
