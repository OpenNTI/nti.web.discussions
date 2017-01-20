import React from 'react';

export default class Participation extends React.Component {
	static propTypes = {
		participation: React.PropTypes.object,
		gotoComment: React.PropTypes.object
	}

	render () {
		return (
			<div className="participation-summary">
				<span>Participation</span>
			</div>
		);
	}
}
