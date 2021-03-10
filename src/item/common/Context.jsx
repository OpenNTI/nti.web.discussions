import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import { Text } from '@nti/web-commons';

import { PinnedLabel } from '../components';

import Styles from './Context.css';

const cx = classnames.bind(Styles);

const shouldShowContext = (post, context) => {
	if (post?.isPinned) {
		return true;
	}
	if (post?.contextId !== context?.getID?.() && post?.contextTitle) {
		return true;
	}
};

DiscussionItemContext.propTypes = {
	className: PropTypes.string,
	post: PropTypes.shape({
		contextId: PropTypes.string,
		contextTitle: PropTypes.string,
		isPinned: PropTypes.bool,
	}),
	context: PropTypes.shape({
		getID: PropTypes.func,
	}),
};
export default function DiscussionItemContext({ className, post, context }) {
	if (!shouldShowContext(post, context)) {
		return null;
	}

	const pinned = post?.isPinned;

	return (
		<div className={cx('discussion-item-context', className)}>
			<Text.Base className={cx('context-title')}>
				{post?.contextTitle || ''}
			</Text.Base>
			{pinned && <PinnedLabel className={cx('pinned')} />}
		</div>
	);
}
