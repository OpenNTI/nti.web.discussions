import React from 'react';
import PropTypes from 'prop-types';

SharingList.propTypes = {
	post: PropTypes.shape({
		setup: PropTypes.bool,

		mentions: PropTypes.array,

		sharedWith: PropTypes.array,
		setSharedWith: PropTypes.func,
		canEditSharing: PropTypes.bool
	})
};
export default function SharingList ({post}) {
	const {setup, mentions, sharedWith, setSharedWith, canEditSharing} = post;

	const activeMentions = React.useRef([]);

	React.useEffect(() => {
		//TODO append new mentions
	}, [mentions]);

	if (!setup) { return null; }

	debugger;

	return (
		<div>
			Sharing List
		</div>
	);
}