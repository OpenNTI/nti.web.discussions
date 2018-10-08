import React from 'react';
import PropTypes from 'prop-types';

import HighlightedContent from './HighlightedContent';

export default class Item extends React.Component {
	static propTypes = {
		item: PropTypes.shape({
			title: PropTypes.string
		}).isRequired,
		searchTerm: PropTypes.string,
		onClick: PropTypes.func,
	}

	onClick = () => this.props.onClick(this.props.item);

	render () {
		const { item: { title }, searchTerm } = this.props;

		return (
			<div className="discussion-selection-item" onClick={this.onClick}>
				<div className="content">
					<HighlightedContent content={title} term={searchTerm} />
				</div>
				<div className="arrow-icon">
					<i className="icon-chevron-right" />
				</div>
			</div>
		);
	}
}
