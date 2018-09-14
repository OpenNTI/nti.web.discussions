import React from 'react';
import PropTypes from 'prop-types';
import { LinkTo } from '@nti/web-routing';
import { Loading } from '@nti/web-commons';
import { scoped } from '@nti/lib-locale';
import cx from 'classnames';
import { encodeForURI } from '@nti/lib-ntiids';
import { Connectors } from '@nti/lib-store';

import Editor from '../forum-editor';

import Store from './Store';

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
@Connectors.Any.connect(['refreshForumId', 'clearRefreshForum'])
class ForumItem extends React.Component {
	static propTypes = {
		item: PropTypes.shape({
			getRecentActivity: PropTypes.func.isRequired,
			title: PropTypes.string.isRequired,
			edit: PropTypes.func.isRequired,
			getID: PropTypes.func.isRequired
		}).isRequired,
		refreshForumId: PropTypes.string,
		clearRefreshForum: PropTypes.func
	}

	static contextTypes = {
		router: PropTypes.object
	}

	state = {
		loading: true,
		showRecentActivity: false,
		recentActivity: [],
		showEditor: false
	}

	componentDidMount () {
		this.load(this.props.item);
	}

	componentDidUpdate (prevProps) {
		const refresh = this.props.refreshForumId === this.props.item.getID();
		if (prevProps.item !== this.props.item || refresh) {
			this.load(this.props.item, refresh);
		}
	}

	async load (forum, refresh) {
		const { Items, TotalItemCount } = await forum.getRecentActivity();
		this.setState({
			loading: false,
			recentActivity: Items,
			totalItemCount: TotalItemCount
		});

		if (refresh) {
			this.props.clearRefreshForum();
		}
	}

	onSubmit = (payload) => {
		this.props.item.edit(payload);
		this.setState({ showEditor: false });
	}

	toggleEditor = (e) => {
		e.preventDefault();
		this.setState({ showEditor: !this.state.showEditor });
	}

	render () {
		let { totalItemCount, loading, showEditor } = this.state;
		let { item } = this.props;
		const forumItemClassname = cx('forum-item-li', { active: global.location.pathname.indexOf(encodeForURI(item.NTIID)) > -1 });
		const canEdit = item.hasLink('edit');

		return (
			<li className={forumItemClassname}>
				{loading ? (
					<Loading.Ellipse />
				) : (
					<LinkTo.Object object={item} className="blockLink">
						<div className="item-container">
							<div className="item-main">
								<span className="title">{item.title}</span>
								<div className="meta">
									<span className="see-all count">{t('count', { count: totalItemCount })}</span>
								</div>
							</div>
							<div className="forum-item-edit" onClick={this.toggleEditor}>
								<i className="icon-edit" />
							</div>
						</div>
					</LinkTo.Object>
				)}
				{showEditor && canEdit && <Editor title={item.title} onSubmit={this.onSubmit} onBeforeDismiss={this.toggleEditor} isEditing />}
			</li>
		);
	}
}
