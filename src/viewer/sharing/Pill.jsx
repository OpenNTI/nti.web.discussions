import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {scoped} from '@nti/lib-locale';
import {DisplayName, Icons, Text, Flyout} from '@nti/web-commons';

import Styles from './Styles.css';
import {isGroup, getEntity} from './Types';

const cx = classnames.bind(Styles);
const t = scoped('nti-discussions.viewer.mentions.Pill', {
	multiple: {
		users: {
			one: '%(count)s Mention',
			other: '%(count)s Mentions'
		}
	},
	onlyMe: 'Only Me'
});

Pill.propTypes = {
	sharedWith: PropTypes.any,
	onlyMe: PropTypes.bool,
	onRemove: PropTypes.func
};
export default function Pill ({sharedWith, onlyMe, onRemove}) {
	const multiple = Array.isArray(sharedWith);

	let typeClass = null;
	let label = null;
	let icon = null;

	if (onlyMe) {
		typeClass = cx('only-me');
		label = (<Text.Base>{t('onlyMe')}</Text.Base>);
		icon = (<Icons.Eye.Slash className={cx('icon')} />);
	} else if (multiple) {
		typeClass = cx('multiple');
		label = (<Text.Base>{t('multiple.users', {count: sharedWith.length})}</Text.Base>);
		icon = (<Icons.Person className={cx('icon')} />);
	} else if (isGroup(sharedWith)) {
		typeClass = cx('group');
		label = (<DisplayName entity={getEntity(sharedWith)} />);
		icon = (<Icons.Globe className={cx('icon')} />);
	} else {
		typeClass = cx('user');
		label = (<DisplayName entity={getEntity(sharedWith)} />);
		icon = (<Icons.Person className={cx('icon')} />);
	}

	const pill = (
		<div className={cx('sharing-pill', typeClass)}>
			{icon}
			{label}
			{!multiple && onRemove && (
				<Icons.X className={cx('remove')} onClick={() => onRemove(sharedWith)} />
			)}
		</div>
	);

	if (multiple) {
		return (
			<Flyout.Triggered
				hover
				trigger={pill}
				horizontalAlign={Flyout.ALIGNMENTS.LEFT}
			>
				<ul className={cx('nested-pills')}>
					{sharedWith.map((shared, key) => (
						<li key={key}>
							<Pill sharedWith={shared} onRemove={onRemove} />
						</li>
					))}
				</ul>
			</Flyout.Triggered>
		);
	}

	return pill;
}