import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {LinkTo} from '@nti/web-routing';
import {LuckyCharms} from '@nti/web-commons';

import Styles from './View.css';
import Comments from './Comments';
import Content from './Content';
import Header from './Header';

const cx = classnames.bind(Styles);

PostCard.propTypes = {
	item: PropTypes.object
};
export default function PostCard (props) {
	const {item} = props;

	return (
		<LinkTo.Object object={item} className={cx('post-card')}>
			<LuckyCharms item={item} asButton />
			<Header {...props} />
			<Content {...props} />
			<Comments {...props} />
		</LinkTo.Object>
	);
}