import React from 'react';
import PropTypes from 'prop-types';
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
		comment: PropTypes.object,
		gotoComment: PropTypes.func,
	}

	gotoComment = () => {
		const {gotoComment, comment} = this.props;

		if (gotoComment) {
			gotoComment(comment);
		}
	}

	render () {
		const {comment} = this.props;
		const {creator, body, ReferencedByCount:commentCount} = comment;
		const created = comment.getCreatedTime();

		return (
			<div className="topic-participation-summary-comment" onClick={this.gotoComment}>
				<Avatar entity={creator} />
				<div className="wrap">
					<div className="meta">
						<DisplayName entity={creator} />
						<DateTime date={created} format="llll"/>
					</div>
					<Panel className="body-content" body={body || []} />
					<span className="comments">{t('comments', {count: commentCount})}</span>
				</div>
			</div>
		);
	}
}
