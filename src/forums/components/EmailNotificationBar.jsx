import React from 'react';
import { Panels } from '@nti/web-commons';
import { scoped } from '@nti/lib-locale';

const t = scoped('discussions.forums.EmailNotificationBar', {
	message: 'Creating a discussion in this forum will notify the community.',
});

export default class EmailNotificationBar extends React.Component {
	render() {
		return <Panels.MessageBar iconCls="icon-bell" message={t('message')} />;
	}
}
