import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import { scoped } from '@nti/lib-locale';
import { Button, Loading } from '@nti/web-commons';

import Styles from '../Styles.css';

const cx = classnames.bind(Styles);
const t = scoped('nti-discussions.editor.parts.controls.Save', {
	save: 'Post',
	update: 'Update',
});

Save.propTypes = {
	post: PropTypes.shape({
		hasChanged: PropTypes.bool,
		isNew: PropTypes.bool,
		saving: PropTypes.bool,
		onSave: PropTypes.func,
	}),

	saveLabel: PropTypes.string,
};
export default function Save({ post, saveLabel }) {
	const { hasChanged, isNew, saving, onSave } = post;
	const label = saveLabel || (isNew ? t('save') : t('update'));

	return (
		<Button
			className={cx('save', { saving })}
			disabled={saving || !hasChanged}
			onClick={onSave}
		>
			{saving && <Loading.Spinner white />}
			{!saving && label}
		</Button>
	);
}
