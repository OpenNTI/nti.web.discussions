import { useContext } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { LinkTo } from '@nti/web-routing';
import { User } from '@nti/web-commons';

import Context from '../Context';

import styles from './Mention.css';

function getAccess(post, user) {
	const mention = post?.getMentionFor(user);
	if (mention) {
		return mention;
	}

	const sharedWith = post?.isSharedWith(user);

	if (sharedWith) {
		return { User: user, CanAccessContent: true };
	}

	return null;
}

Mention.handles = attributes =>
	attributes['data-nti-entity-type'] === 'MENTION';
Mention.propTypes = {
	'data-nti-entity-username': PropTypes.string,
	children: PropTypes.any,
};
export default function Mention(props) {
	const { post } = useContext(Context) ?? {};
	const username = props['data-nti-entity-username'];
	const user = User.useUser(username);

	const access = user && getAccess(post, user);

	if (!access) {
		return <span className="broken-mention">{props.children}</span>;
	}

	return !access.CanAccessContent ? (
		<User.DisplayName user={access.User} />
	) : (
		<LinkTo.Object object={access.User} className={cx(styles.mention)}>
			<User.DisplayName user={access.User} />
		</LinkTo.Object>
	);
}
