import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {LinkTo} from '@nti/web-routing';
import {User} from '@nti/web-commons';

import Context from '../Context';

import Styles from './Mention.css';

const cx = classnames.bind(Styles);

function getAccess (post, username) {
	const mention = post?.getMentionFor(username);
	const sharedWith = post?.getSharedWithFor(username);

	if (mention) { return mention; }
	if (sharedWith) { return {User: sharedWith, CanAccessContent: true}; }

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
	const access = getAccess(post, username);

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