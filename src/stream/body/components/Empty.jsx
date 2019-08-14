import React from 'react';
import classnames from 'classnames/bind';
import {scoped} from '@nti/lib-locale';
import {EmptyState} from '@nti/web-commons';

import Styles from './Empty.css';

const cx = classnames.bind(Styles);
const t = scoped('nti-discussions.stream.body.components.Empty', {
	message: 'There isn\'t any activity here yet.'
});

export default function EmptyStream () {
	return (
		<EmptyState header={t('message')} />
	);
}
