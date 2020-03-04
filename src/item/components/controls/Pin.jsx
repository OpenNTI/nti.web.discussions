import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {scoped} from '@nti/lib-locale';
import {Events} from '@nti/web-session';
import {Text, Prompt} from '@nti/web-commons';

import Styles from './Styles.css';

const cx = classnames.bind(Styles);
const t = scoped('nti-web-discussions.item.components.controls.Pin', {
	pin: 'Pin to Channel',
	unpin: 'Unpin from Channel',
	failed: {
		title: 'Error',
		message: {
			pinned: 'Unable to pin post to the channel.',
			unpinned: 'Unable to unpin post from the channel.'
		}
	}
});

DiscussionItemPin.isAvailable = (item) => item.isPinnable;
DiscussionItemPin.propTypes = {
	item: PropTypes.shape({
		isPinneable: PropTypes.bool,
		isPinned: PropTypes.bool,
		togglePinned: PropTypes.func
	}),
	doClose: PropTypes.func
};
export default function DiscussionItemPin ({item, doClose}) {
	const [saving, setSaving] = React.useState(false);
	const onClick = async (e) => {
		e.preventDefault();
		e.stopPropagation();

		setSaving(true);

		try {
			const wasPinned = item.isPinned;

			await item.togglePinned();

			if (wasPinned && !item.isPinned) {
				Events.emit(Events.ITEM_UNPINNED, item);
			} else if (!wasPinned && item.isPinned) {
				Events.emit(Events.ITEM_PINNED, item);
			}
		} catch (err) {
			Prompt.alert(item.isPinned ? t('failed.message.pinned') : t('failed.message.unpinned'), t('failed.title'));
		} finally {
			doClose();
		}
	};

	return (
		<Text.Base as="a" role="button" className={cx('action', {busy: saving})} onClick={onClick}>
			{item.isPinned ? t('unpin') : t('pin')}
		</Text.Base>
	);
}