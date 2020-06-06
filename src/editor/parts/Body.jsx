import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {scoped} from '@nti/lib-locale';
import {Editor} from '@nti/web-modeled-content';

import Styles from './Styles.css';

const cx = classnames.bind(Styles);
const t = scoped('nti-discussions.editor.parts.Body', {
	placeholder: 'Start a Discussion...'
});

DiscussionEditorBody.propTypes = {
	body: PropTypes.array,
	onChange: PropTypes.func
};
export default function DiscussionEditorBody ({body, onChange}) {
	return (
		<Editor
			className={cx('body')}
			content={body}
			onContentChange={onChange}
			placeholder={t('placeholder')}
		/>
	);
}