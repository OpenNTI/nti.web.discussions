import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Logger from '@nti/util-logger';

import getType from './types';

const logger = Logger.get('lib:components:discussions:Context');

export default class Context extends React.Component {
	static propTypes = {
		item: PropTypes.shape({ getContextData: PropTypes.func }).isRequired
	}

	state = {}

	componentDidMount () {
		this.updateContext();
	}

	componentDidUpdate ({item}) {
		if (this.props.item !== item) {
			this.updateContext();
		}
	}

	componentDidCatch (e) {
		logger.error(e);
	}

	async updateContext () {
		const { item } = this.props;

		try {
			this.setState({loading: true, error: null});
			//Do not combine these two lines... the second setState executes AFTER getContextData resolves
			this.setState({context: await item.getContextData()});

		} catch (error) {
			this.setState({ error });
		} finally {
			this.setState({ loading: false });
		}
	}



	render () {
		const {props: {item}, state: {context}} = this;
		const Content = getType(context);
		return (
			<div className={cx('discussion-context-view', Content.cssClassName)}>
				{!context || !item ? null : (
					<Content item={context} for={item} />
				)}
			</div>
		);
	}
}
