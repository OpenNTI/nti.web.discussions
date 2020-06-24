import {Router, Route} from '@nti/web-routing';

import Viewer from './Viewer';

export default Router.for([
	Route({path: '/', component: Viewer})
]);