/*eslint no-console: 0*/
import React from 'react';
import ReactDOM from 'react-dom';

import Test from './ItemList';

window.$AppConfig = window.$AppConfig || {server: '/dataserver2/'};



//Kitchen Sink
ReactDOM.render(
	<Test />,
	document.getElementById('content')
);
