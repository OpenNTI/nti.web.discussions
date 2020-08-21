import './EmptyTopicList.scss';
import React from 'react';
import PropTypes from 'prop-types';
import { scoped } from '@nti/lib-locale';

const DEAFULT_TEXT = {
	editorText: 'Create a forum. There are no forums to display.',
	nonEditorText: 'There are no forums to display.'
};

const t = scoped('nti.web.disscussions.forums.emptytopiclist', DEAFULT_TEXT);

const EmptyTopicList = ({isEditor}) => (
	<div className="empty-topic-list">
		{isEditor ? t('editorText') : t('nonEditorText')}
	</div>
);

EmptyTopicList.propTypes = {
	isEditor: PropTypes.bool
};

export default EmptyTopicList;
