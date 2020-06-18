import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {Viewer} from '@nti/web-modeled-content';

import Styles from './Styles.css';
import {getLegacyBody} from './utils';

const cx = classnames.bind(Styles);

DiscussionBody.propTypes = {
	className: PropTypes.string,
	post: PropTypes.shape({
		getBody: PropTypes.func
	})
};
export default function DiscussionBody ({className, post, ...otherProps}) {
	const body = React.useMemo(() => getLegacyBody(post), [post]);

	if (!body) {
		return null;
	}

	return (
		<Viewer
			className={cx('body', className)}
			content={body}
			{...otherProps}
		/>
	);
}