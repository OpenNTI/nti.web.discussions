import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import Styles from './Styles.css';
import LikeAndFavorite from './LikeAndFavorite';
import ActionsFlyout from './ActionsFlyout';

const cx = classnames.bind(Styles);

DiscussionItemControls.ActionsFlyout = ActionsFlyout;
DiscussionItemControls.LikeAndFavorite = LikeAndFavorite;
DiscussionItemControls.propTypes = {
	className: PropTypes.string,
	item: PropTypes.object
};
export default function DiscussionItemControls ({className, item}) {
	return (
		<div className={cx('discussion-item-controls', className)}>
			<LikeAndFavorite item={item} />
			<ActionsFlyout item={item} />
		</div>
	);
}