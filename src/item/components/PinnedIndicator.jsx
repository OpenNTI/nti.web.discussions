import React from 'react';
import PropTypes from 'prop-types';
import {scoped} from '@nti/lib-locale';
import {Events} from '@nti/web-session';
import {Hooks, Text} from '@nti/web-commons';

const t = scoped('nti-web-dicsussions.item.components.PinnedIndicator', {
	pinned: 'Pinned to Channel'
});

const addSessionEventListenerFor = (event, item, fn) => {
	const listener = (target) => {
		if (target?.getID() === item?.getID()) {
			fn();
		}
	};

	Events.addListener(event, listener);

	return () => Event.removeListener(event, listener);
};

PinnedIndicator.propTypes = {
	item: PropTypes.shape({
		isPinned: PropTypes.bool,
		addPinChangeListener: PropTypes.func
	})
};
export default function PinnedIndicator ({item, ...otherProps}) {
	const forceUpdate = Hooks.useForceUpdate();

	React.useEffect(() => {
		const cleanup = [
			item?.addPinChangeListener?.(forceUpdate),
			addSessionEventListenerFor(Events.ITEM_PINNED, item, forceUpdate),
			addSessionEventListenerFor(Events.ITEM_UNPINNED, item, forceUpdate)
		];

		return () => {
			for (let clean of cleanup) {
				if (typeof clean === 'function') {
					clean();
				}
			}
		};
	}, [item]);

	if (!item.isPinned) { return null; }

	return (
		<Text.Base {...otherProps}>
			{t('pinned')}
		</Text.Base>
	);
}