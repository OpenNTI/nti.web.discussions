import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import Styles from './Styles.css';
import Pill from './Pill';
import {Types} from './utils';

const {isGroup, isAnonymous} = Types;

const cx = classnames.bind(Styles);

MentionPills.propTypes = {
	className: PropTypes.string,
	sharedWith: PropTypes.array,
	onRemove: PropTypes.func,
	loading: PropTypes.bool
};
export default function MentionPills ({className, sharedWith, loading, onRemove}) {
	if (loading) {
		return (
			<ul className={cx('sharing-pills', className)}>
				<li className={cx('loading')} />
			</ul>
		);
	}

	if (!sharedWith?.length) {
		return (
			<ul className={cx('sharing-pills', className)}>
				<li>
					<Pill onlyMe />
				</li>
			</ul>
		);
	}

	const {groups, users, anonymous} = (sharedWith || []).reduce((acc, entity) => {
		if (isAnonymous(entity)) {
			acc.anonymous.push(entity);
		} else if (isGroup(entity)) {
			acc.groups.push(entity);
		} else {
			acc.users.push(entity);
		}

		return acc;
	}, {groups: [], users: [], anonymous: []});

	return (
		<ul className={cx('sharing-pills', className)}>
			{(groups || []).map((entity, key) => {
				return (
					<li key={`sharedWith-${key}`}>
						<Pill sharedWith={entity} onRemove={onRemove}/>
					</li>
				);
			})}
			{(users.length > 0) && (
				<li>
					<Pill sharedWith={users} onRemove={onRemove} />
				</li>
			)}
			{(anonymous.length > 0) && (
				<li>
					<Pill sharedWith={anonymous} onRemove={onRemove} unknown />
				</li>
			)}
		</ul>
	);
}