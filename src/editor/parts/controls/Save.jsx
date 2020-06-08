import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {scoped} from '@nti/lib-locale';
import {Button} from '@nti/web-commons';

import Styles from '../Styles.css';

const cx = classnames.bind(Styles);
const t = scoped('nti-discussions.editor.parts.controls.Save', {
	save: 'Save',
	update: 'Update'
});

Save.propTypes = {
	hasChange: PropTypes.bool,
	saving: PropTypes.bool,
	onSave: PropTypes.func,
	isUpdate: PropTypes.bool
};
export default function Save ({hasChange, saving, onSave, isUpdate}) {
	return (
		<Button
			className={cx('save')}
			disabled={saving || !hasChange}
			onClick={onSave}
		>
			{isUpdate ? t('update') : t('save')}
		</Button>
	);
}