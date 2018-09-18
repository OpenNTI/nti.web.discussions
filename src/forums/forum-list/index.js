import { Router, Route } from '@nti/web-routing';

import ForumListView from './View';

export * from './constants';

export const ForumList = Router.for([
	Route({
		path: '/',
		component: ForumListView
	})
]);
