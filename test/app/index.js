/*eslint no-console: 0*/
import React from 'react';
import ReactDOM from 'react-dom';

import Test from './Editor';

window.$AppConfig = window.$AppConfig || {server: '/dataserver2/', username: 'andrew.ligon@nextthought.com'};

//Kitchen Sink
ReactDOM.render(
	<Test />,
	document.getElementById('content')
);
