import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {User} from '@nti/web-commons';

import Styles from './Styles.css';

const cx = classnames.bind(Styles);

DiscussionEditorIdentity.propTypes = {
	creator: PropTypes.object
};
export default function DiscussionEditorIdentity ({creator}) {
	const avatarProps = creator ? {user: creator} : {me: true};

	return (
		<div className={cx('identity')}>
			<User.Avatar {...avatarProps} />
		</div>
	);
}