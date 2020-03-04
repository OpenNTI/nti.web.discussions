import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {scoped} from '@nti/lib-locale';
import {Events} from '@nti/web-session';
import {Text, Prompt} from '@nti/web-commons';

import Styles from './Styles.css';

const cx = classnames.bind(Styles);
const t = scoped('nti-web-discussions.item.components.controls.delete', {
	delete: 'Delete',
	confirm: {
		title: 'Are you sure?',
		message: 'Deleting a post will permanently remove it.'
	},
	failed: {
		title: 'Error',
		message: 'Unable to delete post.'
	}
});

DiscussionItemDelete.isAvailable = (item) => item.isModifiable;
DiscussionItemDelete.propTypes = {
	item: PropTypes.shape({
		isModifiable: PropTypes.bool,
		delete: PropTypes.func,
		isTopic: PropTypes.bool,
		isNote: PropTypes.bool,
		isBlogEntry: PropTypes.bool
	}),
	doClose: PropTypes.func
};
export default function DiscussionItemDelete ({item, doClose}) {
	const [deleting, setDeleting] = React.useState(false);
	const onClick = async (e) => {
		e.preventDefault();
		e.stopPropagation();

		setDeleting(true);

		try {
			await Prompt.areYouSure(t('confirm.message'), t('confirm.title'));

			doClose();

			await item.delete();

			if (item.isTopic) {
				Events.emit(Events.TOPIC_DELETED, item);
			} else if (item.isNote) {
				Events.emit(Events.NOTE_DELETED, item);
			} else if (item.isBlogEntry) {
				Events.emit(Events.BLOG_ENTRY_DELETED, item);
			}
		} catch (err) {
			Prompt.alert(t('failed.message'), t('failed.title'));
			doClose();
		}
	};

	return (
		<Text.Base as="a" role="button" className={cx('action', {busy: deleting})} onClick={onClick}>
			{t('delete')}
		</Text.Base>
	);
}