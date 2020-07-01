import React from 'react';
import PropTypes from 'prop-types';
import {scoped} from '@nti/lib-locale';
import {StandardUI} from '@nti/web-commons';

const t = scoped('nti-discussions.creation.parts.Header', {
	small: 'New Discussion',
	containerTitle: 'Posting in %(title)s'
});

const getContainerTitle = (container) => {
	const containers = Array.isArray(container) ? ([...container]).reverse() : [container];

	for (let parent of containers) {
		if (parent.title) {
			return parent.title;
		}
	}
};


DiscussionCreationHeader.propTypes = {
	small: PropTypes.bool,
	onClose: PropTypes.func,

	container: PropTypes.any,
	setContainer: PropTypes.func,
	containers: PropTypes.array
};
export default function DiscussionCreationHeader ({small, onClose, container, setContainer, containers}) {
	let title = null;

	if (small) {
		title = t('small');
	} else if (container) {
		title = t('containerTitle', {title: getContainerTitle(container)});
	}

	return (
		<StandardUI.Window.TitleBar
			onClose={onClose}
			title={title}
		/>
	);
}