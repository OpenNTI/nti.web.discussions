import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import { Like, Favorite } from '@nti/web-commons';

import Styles from './Styles.css';

const cx = classnames.bind(Styles);

DiscussionItemControlsLikeAndFavorite.propTypes = {
	className: PropTypes.string,
	item: PropTypes.shape({
		isTopLevel: PropTypes.func,
		placeholder: PropTypes.bool,
	}).isRequired,
};
export default function DiscussionItemControlsLikeAndFavorite({
	className,
	item,
}) {
	if (!item || !item.isTopLevel || item.placeholder) {
		return null;
	}

	return (
		<div className={cx('like-and-favorite', className)}>
			<Like item={item} asButton />
			{item.isTopLevel() && <Favorite item={item} asButton />}
		</div>
	);
}
