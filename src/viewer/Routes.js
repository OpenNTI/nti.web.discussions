import { Router, Route } from '@nti/web-routing';

import Viewer from './Viewer';
import Body from './body';
import Sharing from './sharing';
import Context from './post/parts/Context';
import Title from './post/parts/Title';

const DiscussionViewerRouter = Router.for([
	Route({ path: '/', component: Viewer }),
]);

DiscussionViewerRouter.Title = Title;
DiscussionViewerRouter.Body = Body;
DiscussionViewerRouter.Sharing = Sharing;
DiscussionViewerRouter.setContextOverride = Context.setContextOverride;

export default DiscussionViewerRouter;
