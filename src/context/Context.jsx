import React from 'react';
import PropTypes from 'prop-types';

export default class Context extends React.Component {
	static propTypes = {
		item: PropTypes.shape({ getContextData: PropTypes.func }).isRequired
	}

	render () {
		return (
			<div />
		);
	}
}
