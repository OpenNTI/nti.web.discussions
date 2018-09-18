import React from 'react';
import PropTypes from 'prop-types';
import { LinkTo } from '@nti/web-routing';
import { HOC } from '@nti/web-commons';
import { scoped } from '@nti/lib-locale';
import cx from 'classnames';
import { encodeForURI } from '@nti/lib-ntiids';

import Editor from '../forum-editor';

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

	onSubmit = (payload) => {
		this.props.item.edit(payload);
		this.setState({ showEditor: false });
	}

	toggleEditor = (e) => {
		e.preventDefault();
		this.setState({ showEditor: !this.state.showEditor });
	}

	render () {
		const { showEditor } = this.state;
		const { item } = this.props;
		const canEdit = item.hasLink('edit');

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
						{canEdit && (
							<div className="forum-item-edit" onClick={this.toggleEditor}>
								<i className="icon-edit" />
							</div>
						)}
					</div>
				</LinkTo.Object>
				{showEditor && <Editor title={item.title} onSubmit={this.onSubmit} onBeforeDismiss={this.toggleEditor} isEditing />}
			</li>
		);
	}
}
