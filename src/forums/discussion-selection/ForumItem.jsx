import React from 'react';
import PropTypes from 'prop-types';

import HighlightedContent from './HighlightedContent';


export default class ForumItem extends React.Component {
	static propTypes = {
		item: PropTypes.shape({
			title: PropTypes.string,
			get: PropTypes.func.isRequired
		}).isRequired,
		searchTerm: PropTypes.string,
		onClick: PropTypes.func,
	}

	onClick = () => this.props.onClick(this.props.item);

	render () {
		const { item, searchTerm } = this.props;

		return (
			<div className="discussion-selection-item" onClick={this.onClick}>
				<div className="content">
					<HighlightedContent content={item.get('displayTitle') || item.title} term={searchTerm} />
				</div>
				<div className="arrow-icon">
					<i className="icon-chevron-right" />
				</div>
			</div>
		);
	}
}
