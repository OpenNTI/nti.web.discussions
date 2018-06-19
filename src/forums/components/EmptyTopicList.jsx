import React from 'react';
import { scoped } from '@nti/lib-locale';

const DEAFULT_TEXT = {
	text: 'Create a forum. There are no forums to display.'
};

const t = scoped('nti.web.disscussions.forums.emptytopiclist', DEAFULT_TEXT);

const EmptyTopicList = () => (
	<div className="empty-topic-list">
		{t('text')}
	</div>
);

export default EmptyTopicList;
