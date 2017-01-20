import React from 'react';
import {Panel} from 'nti-modeled-content';
import {Avatar, DisplayName, DateTime} from 'nti-web-commons';
import {scoped} from 'nti-lib-locale';

const DEFAULT_TEXT = {
	comments: {
		one: '%(count)s Comment',
		other: '%(count)s Comments'
	},
	jumpTo: 'Jump to Comment'
};

const t = scoped('TOPIC_PARCITIPATION_ITEM_COMMENT', DEFAULT_TEXT);

export default class Comment extends React.Component {
	static propTypes = {
		comment: React.PropTypes.object,
		gotoComment: React.PropTypes.func,
	}

	gotoComment () {

	}

	render () {
		const {comment} = this.props;
		const {creator, body, ReferencedByCount:commentCount} = comment;
		const created = comment.getCreatedTime();

		return (
			<div className="topic-participation-summary-comment">
				<Avatar entity={creator} />
				<div className="wrap">
					<div className="meta">
						<DisplayName entity={creator} />
						<DateTime date={created} format="llll"/>
					</div>
					<Panel body={body || []} />
					<span className="comments">{t('comments', {count: commentCount})}</span>
				</div>
				<div className="navigate">
					<i className="icon-chevron-right" onClick={this.gotoComment} />
				</div>
			</div>
		);
	}
}
