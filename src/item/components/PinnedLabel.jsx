import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import { scoped } from '@nti/lib-locale';
import { Text } from '@nti/web-commons';

import Styles from './PinnedLabel.css';

const cx = classnames.bind(Styles);
const t = scoped('nti-web-discussions.item.components.PinnedLabel', {
	pinned: 'Pinned',
});

PinnedLabel.propTypes = {
	className: PropTypes.string,
};
export default function PinnedLabel({ className }) {
	return (
		<div className={cx('pinned-label', className)}>
			<span className={cx('icon')} />
			<Text.Base className={cx('label')}>{t('pinned')}</Text.Base>
		</div>
	);
}
