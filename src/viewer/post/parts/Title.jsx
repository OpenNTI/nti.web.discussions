import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {Text, Hooks} from '@nti/web-commons';

import Styles from '../Styles.css';

const cx = classnames.bind(Styles);

PostTitle.propTypes = {
	className: PropTypes.string,
	as: PropTypes.any,
	post: PropTypes.shape({
		getTitle: PropTypes.func,
		subscribeToPostChange: PropTypes.func
	})
};
export default function PostTitle ({className, as:cmp, post}) {
	const forceUpdate = Hooks.useForceUpdate();

	React.useEffect(() => post.subscribeToPostChange(forceUpdate), [post]);

	return (
		<Text.Base as={cmp || 'h1'} className={cx('title', className)}>
			{post.getTitle()}
		</Text.Base>
	);
}