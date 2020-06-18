import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {LinkTo} from '@nti/web-routing';
import {User} from '@nti/web-commons';

import Context from '../Context';

import Styles from './Mention.css';

const cx = classnames.bind(Styles);

Mention.handles = (attributes) => attributes['data-nti-entity-type'] === 'MENTION';
Mention.propTypes = {
	'data-nti-entity-username': PropTypes.string,
	children: PropTypes.any
};
export default function Mention (props) {
	const {post} = React.useContext(Context) ?? {};

	const username = props['data-nti-entity-username'];
	const mention = post?.getMentionFor(username);

	if (!mention) {
		return (
			<span className={cx('broken-mention')}>{props.children}</span>
		);
	}

	return !mention.CanAccessContent ?
		(<User.DisplayName user={mention.User} />) :
		(
			<LinkTo.Object object={mention.User} className={cx('mention')}>
				<User.DisplayName user={mention.User} />
			</LinkTo.Object>
		);
}