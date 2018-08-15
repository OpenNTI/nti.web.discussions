/*eslint no-console: 0*/
import React from 'react';
import ReactDOM from 'react-dom';
// import PropTypes from 'prop-types';
import { getAppUser } from '@nti/web-client';
import { HOC } from '@nti/web-commons';

import { Context, Forums } from '../../src';

window.$AppConfig = window.$AppConfig || {server: '/dataserver2/'};



class Test extends React.Component {

	state = {};

	async componentDidMount () {
		this.setState({store: (await getAppUser()).getActivity() });
	}

	render () {
		const { store } = this.state;

		return (
			<HOC.ItemChanges item={store} onItemChanged={() => this.forceUpdate()}>
				<div className="context-container">
					{Array.from(store || {}).filter(x => x.getContextData).map(x => (
						<Context item={x} key={x.getID()}/>
					))}
				</div>
			</HOC.ItemChanges>
		);
	}
}



//Kitchen Sink
ReactDOM.render(
	<React.Fragment>
		<Test/>
		<div className="test-kitchen">
			<Forums.TopicParticipationSummary topicID="tag:nextthought.com,2011-10:unknown-OID-0x4e6552:5573657273:Rb83ESkeGSX" />
		</div>,
	</React.Fragment>,
	document.getElementById('content')
);
