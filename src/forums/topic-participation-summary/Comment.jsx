import React from 'react';
import {Panel} from 'nti-modeled-content';
import {Avatar, DisplayName, DateTime} from 'nti-web-commons';
import {scoped} from 'nti-lib-locale';

const DEFAULT_TEXT = {
	comments: {
		one: '%(count)s Comment',
		other: '%(count)s Comments'
	}
};

const t = scoped('TOPIC_PARCITIPATION_ITEM_COMMENT', DEFAULT_TEXT);

export default class Comment extends React.Component {
	static propTypes = {
		comment: React.PropTypes.object,
		gotoComment: React.PropTypes.func,
		hideComments: React.PropTypes.bool
	}

	gotoComment () {

	}

	render () {
		const {comment, hideComments} = this.props;
		const {creator, body, ReferencedByCount:commentCount} = comment;
		const created = comment.getCreatedTime();
		const now = Date.now();

		return (
			<div className="topic-participation-summary-comment">
				<Avatar entity={creator} />
				<div className="wrap">
					<div className="meta">
						<DisplayName entity={creator} />
						<DateTime date={created} relativeTo={now} />
					</div>
					<Panel body={body || []} />
					{!hideComments && (<span className="comments">{t('comments', {count: commentCount})}</span>)}
				</div>
			</div>
		);
	}
}
