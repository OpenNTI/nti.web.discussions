import React from 'react';
import PropTypes from 'prop-types';
import {scoped} from '@nti/lib-locale';
import {Hooks, Text} from '@nti/web-commons';

const t = scoped('nti-web-dicsussions.item.components.PinnedIndicator', {
	pinned: 'Pinned to Channel'
});

PinnedIndicator.propTypes = {
	item: PropTypes.shape({
		isPinned: PropTypes.bool,
		addPinChangeListener: PropTypes.func
	})
};
export default function PinnedIndicator ({item, ...otherProps}) {
	const forceUpdate = Hooks.useForceUpdate();

	React.useEffect(() => item.addPinChangeListener(forceUpdate), [item]);

	if (!item.isPinned) { return null; }

	return (
		<Text.Base {...otherProps}>
			{t('pinned')}
		</Text.Base>
	);
}