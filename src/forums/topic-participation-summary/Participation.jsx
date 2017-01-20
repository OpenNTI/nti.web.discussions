import React from 'react';
import {scoped} from 'nti-lib-locale';
import {DisplayName} from 'nti-web-commons';
import {getAppUsername} from 'nti-web-client';

import ParticipationItem from './ParticipationItem';

const DEFAULT_TEXT = {
	headerForOthers: 'Activity for %(name)s:',
	headerForYou: 'Your activity:',
	commentCount: {
		one: 'Comment Created',
		other: 'Comments Created'
	},
	replyCount: {
		one: 'Reply Created',
		other: 'Replies Created'
	},
	replyToCount: {
		one: 'Reply To',
		other: 'Replies To'
	}
};

const t = scoped('TOPIC_PARICIPATION_SUMMARY_PARICIPATION', DEFAULT_TEXT);

export default class Participation extends React.Component {
	static propTypes = {
		participation: React.PropTypes.object.isRequired,
		userID: React.PropTypes.string,
		gotoComment: React.PropTypes.object
	}

	constructor (props) {
		super(props);

		const {userID} = props;

		this.state = {
			user: userID || getAppUsername()
		};
	}

	getHeaderString (data) {
		return t('headerForOthers', data);
	}

	render () {
		const {participation} = this.props;
		const {user} = this.state;
		const {Contexts:contexts} = participation;

		return (
			<div className="topic-participation-summary-participation">
				{this.renderHeader(user)}
				{this.renderCounts(participation)}
				<ul>
					{(contexts || []).map(this.renderItem)}
				</ul>
			</div>
		);
	}


	renderHeader = (user) => {
		return user && (<DisplayName className="header" entity={user} localeKey={this.getHeaderString} usePronoun />);
	}


	renderCounts = (participation) => {
		const {comments, replies, repliesTo} = participation;
		const counts = [
			{value: comments, label: t('commentCount', {count: comments})},
			{value: replies, label: t('replyCount', {count: replies})},
			{value: repliesTo, label: t('replyToCount', {count: replies})}
		];

		function renderCount (count, index) {
			return (
				<div className="count" key={index}>
					<div className="value">{count.value}</div>
					<div className="label">{count.label}</div>
				</div>
			);
		}

		return (
			<div className="counts">
				{counts.map(renderCount)}
			</div>
		);
	}

	renderItem = (item, index) => {
		const {gotoComment} = this.props;

		return (
			<li key={index}>
				<ParticipationItem item={item} gotoComment={gotoComment} />
			</li>
		);
	}
}
