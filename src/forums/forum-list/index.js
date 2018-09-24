import { Router, Route } from '@nti/web-routing';

import ForumListView from './View';

export * from './constants';
export * from './utils';

export const ForumList = Router.for([
	Route({
		path: '/',
		component: ForumListView
	})
]);
