import React from 'react';

import ParticipationItem from './ParticipationItem';

export default class Participation extends React.Component {
	static propTypes = {
		participation: React.PropTypes.object,
		gotoComment: React.PropTypes.object
	}

	render () {
		const {participation} = this.props;
		const {Contexts:contexts} = participation;

		return (
			<div className="topic-participation-summary-participation">
				<ul>
					{contexts.map(this.renderItem)}
				</ul>
			</div>
		);
	}


	renderItem = (item, index, length) => {
		const {gotoComment} = this.props;

		return (
			<li key={index}>
				<ParticipationItem item={item} gotoComment={gotoComment} />
			</li>
		);
	}
}
