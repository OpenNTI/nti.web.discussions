import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {Text} from '@nti/web-commons';

import Styles from '../Styles.css';

const cx = classnames.bind(Styles);

PostTitle.propTypes = {
	post: PropTypes.shape({
		getTitle: PropTypes.func
	})
};
export default function PostTitle ({post}) {
	return (
		<Text.Base as="h1" className={cx('title')}>
			{post.getTitle()}
		</Text.Base>
	);
}