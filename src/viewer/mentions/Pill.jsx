import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {scoped} from '@nti/lib-locale';
import {DisplayName, Icons, Text} from '@nti/web-commons';

import Styles from './Styles.css';
import {isGroup} from './Types';

const cx = classnames.bind(Styles);
const t = scoped('nti-discussions.viewer.mentions.Pill', {
	multiple: {
		users: {
			one: '%(count)s Mention',
			other: '%(count)s Mentions'
		}
	}
});

Pill.propTypes = {
	mention: PropTypes.any,
	locked: PropTypes.bool
};
export default function Pill ({mention, locked}) {
	let typeClass = null;
	let label = null;
	let icon = null;

	if (Array.isArray(mention)) {
		typeClass = cx('multiple');
		label = (<Text.Base>{t('multiple.users', {count: mention.length})}</Text.Base>);
		icon = (<Icons.Person className={cx('icon')} />);
	} else if (isGroup(mention)) {
		typeClass = cx('group');
		label = (<DisplayName entity={mention} />);
	}

	if (locked) {
		icon = (<Icons.Lock className={cx('icon')} />);
	}

	return (
		<div className={cx('mention-pill', typeClass, {locked})}>
			{icon}
			{label}
		</div>
	);
}