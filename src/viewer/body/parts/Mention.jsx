import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {LinkTo} from '@nti/web-routing';
import {User} from '@nti/web-commons';

import Context from '../Context';

import Styles from './Mention.css';

const cx = classnames.bind(Styles);

function getAccess (post, user) {
	const mention = post?.getMentionFor(user);
	if (mention) { return mention; }

	const sharedWith = post?.isSharedWith(user);

	if (sharedWith) { return {User: user, CanAccessContent: true}; }

	return null;
}

Mention.handles = (attributes) => attributes['data-nti-entity-type'] === 'MENTION';
Mention.propTypes = {
	'data-nti-entity-username': PropTypes.string,
	children: PropTypes.any
};
export default function Mention (props) {
	const {post} = React.useContext(Context) ?? {};
	const username = props['data-nti-entity-username'];
	const user = User.useUser(username);

	const access = user && getAccess(post, user);

	if (!access) {
		return (
			<span className={cx('broken-mention')}>{props.children}</span>
		);
	}

	return !access.CanAccessContent ?
		(<User.DisplayName user={access.User} />) :
		(
			<LinkTo.Object object={access.User} className={cx('mention')}>
				<User.DisplayName user={access.User} />
			</LinkTo.Object>
		);
}