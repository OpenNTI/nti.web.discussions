import {Router, Route} from '@nti/web-routing';

import Viewer from './Viewer';
import Body from './body';
import Mentions from './mentions';
import Context from './post/parts/Context';

const DiscussionViewerRouter = Router.for([
	Route({path: '/', component: Viewer})
]);

DiscussionViewerRouter.Body = Body;
DiscussionViewerRouter.Mentions = Mentions;
DiscussionViewerRouter.setContextOverride = Context.setContextOverride;

export default DiscussionViewerRouter;