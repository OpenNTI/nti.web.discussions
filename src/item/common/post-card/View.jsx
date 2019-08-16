import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {LinkTo} from '@nti/web-routing';

import Styles from './View.css';
import Content from './Content';
import Header from './Header';
import Social from './Social';

const cx = classnames.bind(Styles);

PostCard.propTypes = {
	item: PropTypes.object
};
export default function PostCard (props) {
	const {item} = props;

	return (
		<LinkTo.Object object={item} className={cx('post-card')}>
			<Header {...props} />
			<Content {...props} />
			<Social {...props} />
		</LinkTo.Object>
	);
}