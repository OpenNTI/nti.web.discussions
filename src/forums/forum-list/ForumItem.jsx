import React from 'react';
import PropTypes from 'prop-types';
import { LinkTo } from '@nti/web-routing';
import { HOC } from '@nti/web-commons';
import { scoped } from '@nti/lib-locale';

const DEFAULT_TEXT = {
	count: {
		zero: 'No Discussions',
		one: '1 Discussion',
		other: '%(count)s Discussions'
	},
	recentActivity: 'Recent Activity',
};

const t = scoped('forums.topic', DEFAULT_TEXT);


export default
@HOC.ItemChanges.compose
class ForumItem extends React.Component {
	static propTypes = {
		item: PropTypes.shape({
			title: PropTypes.string.isRequired,
			edit: PropTypes.func.isRequired,
			TopicCount: PropTypes.number.isRequired,
			hasLink: PropTypes.func.isRequired
		}).isRequired,
	}

	static contextTypes = {
		router: PropTypes.object
	}

	state = {
		showRecentActivity: false,
		recentActivity: [],
		showEditor: false
	}

	render () {
		const { item } = this.props;

		return (
			<li className="forum-item-li">
				<LinkTo.Object object={item} activeClassName="active" className="forum-link">
					<div className="item-container">
						<div className="item-main">
							<span className="title">{item.displayTitle}</span>
							<div className="meta">
								<span className="see-all count">{t('count', { count: item.TopicCount })}</span>
							</div>
						</div>
					</div>
				</LinkTo.Object>
			</li>
		);
	}
}
