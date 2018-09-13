import React from 'react';
import PropTypes from 'prop-types';

import ForumBoard from './ForumBoard';

export default function ForumBin ({ title, bin }) {
	return (
		<li className="bin">
			{title && <h2 className="bin-title">{title}</h2>}
			<ul className="forum-board-list">
				{
					Object.keys(bin).map((key, i, boards) => (
						<ForumBoard
							title={!title && key === 'Section' && boards.length === 1 ? '' : key}
							board={bin[key]}
							key={key}
						/>
					))
				}
			</ul>
		</li>
	);
}

ForumBin.propTypes = {
	/**
	*	A bin is an object with boards. Currently the usual bins
	* 	are "Enrolled For-Credit", "Open Discussions", "Other Discussions"
	*	{
	*		Parent: {
	*			forums: [...]
	*		},
	*		Section: {
	*			forums: [...]
	*		}
	*	}
	*/
	bin: PropTypes.object.isRequired,

	/**
	* The localized title for this bin (e.g. "Enrolled For-Credit")
	*/
	title: PropTypes.string.isRequired,
};
