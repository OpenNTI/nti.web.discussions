import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import { scoped } from '@nti/lib-locale';
import { Button } from "@nti/web-core";

import Styles from '../Styles.css';

const cx = classnames.bind(Styles);
const t = scoped('nti-discussions.editor.parts.controls.Cancel', {
	cancel: 'Cancel',
});

Cancel.propTypes = {
	onCancel: PropTypes.func,
};
export default function Cancel({ onCancel }) {
	if (!onCancel) {
		return null;
	}

	return (
		<Button className={cx('cancel')} onClick={onCancel}>
			{t('cancel')}
		</Button>
	);
}
