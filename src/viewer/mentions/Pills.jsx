import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import Styles from './Styles.css';
import Pill from './Pill';
import {isGroup} from './Types';

const cx = classnames.bind(Styles);

MentionPills.propTypes = {
	mentions: PropTypes.array,
	lockedMentions: PropTypes.array
};
export default function MentionPills ({mentions, lockedMentions}) {
	const {groups, users} = (mentions || []).reduce((acc, mention) => {
		if (isGroup(mention)) {
			acc.groups.push(mention);
		} else {
			acc.users.push(mention);
		}

		return acc;
	}, {groups: [], users: []});

	return (
		<ul className={cx('mention-pills')}>
			{(lockedMentions || []).map((locked, key) => {
				return (
					<li key={`locked-${key}`}>
						<Pill mention={locked} locked />
					</li>
				);
			})}
			{(groups || []).map((mention, key) => {
				return (
					<li key={`mention-${key}`}>
						<Pill mention={mention} />
					</li>
				);
			})}
			{(users.length > 0) && (
				<li>
					<Pill mention={users} />
				</li>
			)}
		</ul>
	);
}