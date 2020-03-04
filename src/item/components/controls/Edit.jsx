import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {scoped} from '@nti/lib-locale';
import {Text} from '@nti/web-commons';
import {LinkTo} from '@nti/web-routing';

import Styles from './Styles.css';

const cx = classnames.bind(Styles);
const t = scoped('nti-web-discussions.item.components.controls.Edit', {
	edit: 'Edit'
});

DiscussionItemPin.isAvailable = (item) => item.isModifiable;
DiscussionItemPin.propTypes = {
	item: PropTypes.shape({
		isModifiable: PropTypes.bool
	}),
	doClose: PropTypes.func
};
export default function DiscussionItemPin ({item, doClose}) {
	const onClick = () => {
		if (doClose) {
			doClose();
		}
	};

	return (
		<LinkTo.Object object={item} context="edit" onClick={onClick}>
			<Text.Base as="a" role="button" className={cx('action')}>
				{t('edit')}
			</Text.Base>
		</LinkTo.Object>
	);
}