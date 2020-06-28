import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import Styles from './Styles.css';
import Pill from './Pill';
import {isGroup} from './Types';

const cx = classnames.bind(Styles);

MentionPills.propTypes = {
	className: PropTypes.string,
	sharedWith: PropTypes.array
};
export default function MentionPills ({className, sharedWith}) {
	if (!sharedWith?.length) {
		return (
			<ul className={cx('sharing-pills', className)}>
				<li>
					<Pill onlyMe />
				</li>
			</ul>
		);
	}

	const {groups, users} = (sharedWith || []).reduce((acc, entity) => {
		if (isGroup(entity)) {
			acc.groups.push(entity);
		} else {
			acc.users.push(entity);
		}

		return acc;
	}, {groups: [], users: []});

	return (
		<ul className={cx('sharing-pills', className)}>
			{(groups || []).map((entity, key) => {
				return (
					<li key={`sharedWith-${key}`}>
						<Pill sharedWith={entity} />
					</li>
				);
			})}
			{(users.length > 0) && (
				<li>
					<Pill sharedWith={users} />
				</li>
			)}
		</ul>
	);
}