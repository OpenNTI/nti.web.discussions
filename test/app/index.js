/*eslint no-console: 0*/
import React from 'react';
import ReactDOM from 'react-dom';
import {Forums} from '../../src';

import 'normalize.css';
import '@nti/style-common/all.scss';
import '@nti/web-commons/lib/index.css';
import '@nti/web-modeled-content/lib/index.css';

window.$AppConfig = window.$AppConfig || {server: '/dataserver2/'};

//Kitchen Sink
ReactDOM.render(
	<div className="test-kitchen">
		<Forums.TopicParticipationSummary topicID="tag:nextthought.com,2011-10:unknown-OID-0x4e6552:5573657273:Rb83ESkeGSX" />
	</div>,
	document.getElementById('content')
);
