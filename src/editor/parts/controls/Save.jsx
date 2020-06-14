import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {scoped} from '@nti/lib-locale';
import {Button, Loading} from '@nti/web-commons';

import Styles from '../Styles.css';

const cx = classnames.bind(Styles);
const t = scoped('nti-discussions.editor.parts.controls.Save', {
	save: 'Share Post',
	update: 'Update Post'
});

Save.propTypes = {
	post: PropTypes.shape({
		hasChanged: PropTypes.bool,
		isNew: PropTypes.bool,
		saving: PropTypes.bool,
		onSave: PropTypes.func
	})
};
export default function Save ({post}) {
	const {hasChanged, isNew, saving, onSave} = post;

	return (
		<Button
			className={cx('save', {saving})}
			disabled={saving || !hasChanged}
			onClick={onSave}
		>
			{saving && (<Loading.Spinner white />)}
			{!saving && (isNew ? t('save') : t('update'))}
		</Button>
	);
}