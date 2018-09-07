import React from 'react';
import PropTypes from 'prop-types';
import { LinkTo } from '@nti/web-routing';
import { Loading } from '@nti/web-commons';
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

export default class ForumItem extends React.Component {
	static propTypes = {
		item: PropTypes.object
	}

	state = {
		loading: true,
		showRecentActivity: false,
		recentActivity: []
	}

	componentDidMount () {
		this.load(this.props.item);
	}

	componentDidUpdate (prevProps) {
		if (prevProps.item !== this.props.item) {
			this.load(this.props.item);
		}
	}

	async load (forum) {
		const { Items, TotalItemCount } = await forum.getRecentActivity();
		this.setState({
			loading: false,
			recentActivity: Items,
			totalItemCount: TotalItemCount
		});
	}

	render () {
		let { totalItemCount, loading } = this.state;
		let { item } = this.props;

		return (
			<li className="forum-item-li">
				{loading ? (
					<Loading.Ellipse />
				) : (
					<LinkTo.Object object={item} className="blockLink">
						<span className="title">{item.title}</span>
						<div className="meta">
							<span className="see-all count">{t('count', { count: totalItemCount })}</span>
						</div>
						<span className="arrow-right" />
					</LinkTo.Object>
				)}
			</li>
		);
	}
}
