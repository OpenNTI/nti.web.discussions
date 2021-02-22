import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import { User } from '@nti/web-commons';

import Styles from '../Styles.css';

const cx = classnames.bind(Styles);

PostIdentity.propTypes = {
	post: PropTypes.shape({
		creator: PropTypes.any,
	}),
};
export default function PostIdentity({ post }) {
	return (
		<div className={cx('identity')}>
			<User.Avatar user={post.creator} />
		</div>
	);
}
