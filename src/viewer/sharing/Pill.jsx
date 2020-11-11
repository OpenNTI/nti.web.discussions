import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {scoped} from '@nti/lib-locale';
import {DisplayName, Icons, Text, Flyout} from '@nti/web-commons';
import {LinkTo} from '@nti/web-routing';

import Styles from './Styles.css';
import {Types} from './utils';

const {isGroup, getEntity} = Types;

const cx = classnames.bind(Styles);
const t = scoped('nti-discussions.viewer.mentions.Pill', {
	multiple: {
		users: {
			one: '%(count)s Mention',
			other: '%(count)s Mentions'
		},
		other: {
			one: '%(count)s Other',
			other: '%(count)s Others'
		}
	},
	onlyMe: 'Only Me'
});

Pill.propTypes = {
	sharedWith: PropTypes.any,
	displayName: PropTypes.any,

	onlyMe: PropTypes.bool,
	unknown: PropTypes.bool,
	onRemove: PropTypes.func,
	noLink: PropTypes.bool
};
export default function Pill ({sharedWith, displayName, onlyMe, unknown, onRemove, noLink}) {
	const multiple = Array.isArray(sharedWith);

	let typeClass = null;
	let label = null;
	let icon = null;

	if (onlyMe) {
		typeClass = cx('only-me');
		label = (<Text.Base>{t('onlyMe')}</Text.Base>);
		icon = (<Icons.Eye.Slash className={cx('icon')} />);
	} else if (multiple) {
		typeClass = cx('multiple', {unknown});
		icon = (<Icons.Person className={cx('icon')} />);
		label = unknown ?
			(<Text.Base>{t('multiple.other', {count: sharedWith.length})}</Text.Base>) :
			(<Text.Base>{t('multiple.users', {count: sharedWith.length})}</Text.Base>);
	} else if (isGroup(sharedWith)) {
		typeClass = cx('group');
		label = displayName ?
			(<Text.Base>{displayName}</Text.Base>) :
			(<DisplayName entity={getEntity(sharedWith)} />);
		icon = (<Icons.Globe className={cx('icon')} />);
	} else {
		typeClass = cx('user');
		label = (<DisplayName entity={getEntity(sharedWith)} />);
		icon = (<Icons.Person className={cx('icon')} />);
	}

	let pill = (
		<div className={cx('sharing-pill', typeClass)}>
			{icon}
			{label}
			{!multiple && onRemove && (
				<Icons.X className={cx('remove')} onClick={() => onRemove(sharedWith)} />
			)}
		</div>
	);

	if (!multiple && !onRemove && sharedWith && !noLink) {
		pill = (
			<LinkTo.Object object={sharedWith}>
				{pill}
			</LinkTo.Object>
		);
	}


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
							<Pill sharedWith={shared} onRemove={onRemove} noLink={noLink} />
						</li>
					))}
				</ul>
			</Flyout.Triggered>
		);
	}

	return pill;
}
