import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import Viewer from '../../../viewer';
import Styles from '../Styles.css';

const cx = classnames.bind(Styles);

function getMentionsToAdd (prevMentions, mentions) {
	if (prevMentions.length === 0 && mentions.length === 0) { return []; }

	return mentions
		.filter(m => prevMentions.indexOf(m) === -1);
}

SharingList.propTypes = {
	post: PropTypes.shape({
		setup: PropTypes.bool,

		mentions: PropTypes.array,

		sharedWith: PropTypes.array,
		sharingDisplayNames: PropTypes.array,

		setSharedWith: PropTypes.func,
		canEditSharing: PropTypes.bool
	})
};
export default function SharingList ({post}) {
	const {
		setup,
		mentions,
		sharedWith,
		sharingDisplayNames,
		setSharedWith,
		canEditSharing
	} = post;

	const activeMentions = React.useRef(null);

	React.useEffect(() => {
		const prevMentions = activeMentions.current;
		activeMentions.current = mentions;

		if (!canEditSharing || !prevMentions) { return; }

		const toAdd = getMentionsToAdd(prevMentions, mentions);

		if (toAdd.length > 0) {
			setSharedWith(Array.from(new Set([...sharedWith, ...toAdd])));
		}
	}, [mentions]);

	if (!setup) { return null; }

	const onRemove = (sharedTo) => {
		setSharedWith(sharedWith.filter(s => s !== sharedTo));
	};

	return (
		<Viewer.Sharing.Pills
			className={cx('sharing')}
			sharedWith={sharedWith}
			displayNames={sharingDisplayNames}
			onRemove={canEditSharing ? onRemove : null}
			noLink
		/>
	);
}
