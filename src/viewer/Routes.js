import {Router, Route} from '@nti/web-routing';

import Viewer from './Viewer';
import Body from './body';

const DiscussionViewerRouter = Router.for([
	Route({path: '/', component: Viewer})
]);

DiscussionViewerRouter.Body = Body;

export default DiscussionViewerRouter;