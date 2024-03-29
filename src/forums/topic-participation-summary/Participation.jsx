import './Participation.scss';
import React from 'react';
import PropTypes from 'prop-types';

import { scoped } from '@nti/lib-locale';
import { DisplayName } from '@nti/web-commons';

import ParticipationItem from './ParticipationItem';

const DEFAULT_TEXT = {
	headerForOthers: 'Activity for %(name)s:',
	headerForYou: 'Your activity:',
	commentCount: {
		one: 'Comment Created',
		other: 'Comments Created',
	},
	replyCount: {
		one: 'Reply Created',
		other: 'Replies Created',
	},
	replyToCount: {
		one: 'Reply To',
		other: 'Replies To',
	},
};

const t = scoped(
	'discussions.topic-parcitipation-summary.Paricipation',
	DEFAULT_TEXT
);

export default class Participation extends React.Component {
	static propTypes = {
		participation: PropTypes.object.isRequired,
		userID: PropTypes.string,
		gotoComment: PropTypes.func,
	};

	getHeaderString(data) {
		return t('headerForOthers', data);
	}

	render() {
		const { participation, userID } = this.props;
		const { Contexts: contexts } = participation;

		return (
			<div className="topic-participation-summary-participation">
				{this.renderHeader(userID)}
				{this.renderCounts(participation)}
				<ul>{(contexts || []).map(this.renderItem)}</ul>
			</div>
		);
	}

	renderHeader = userID => {
		return userID ? (
			<DisplayName
				className="participation-header"
				entity={userID}
				localeKey={this.getHeaderString}
				usePronoun
			/>
		) : (
			<span className="participation-header">{t('headerForYou')}</span>
		);
	};

	renderCounts = participation => {
		const { comments, replies, repliesTo } = participation;
		const counts = [
			{ value: comments, label: t('commentCount', { count: comments }) },
			{ value: replies, label: t('replyCount', { count: replies }) },
			{ value: repliesTo, label: t('replyToCount', { count: replies }) },
		];

		function renderCount(count, index) {
			return (
				<div className="count" key={index}>
					<div className="value">{count.value}</div>
					<div className="label">{count.label}</div>
				</div>
			);
		}

		return <div className="counts">{counts.map(renderCount)}</div>;
	};

	renderItem = (item, index) => {
		const { gotoComment } = this.props;

		return (
			<li key={index}>
				<ParticipationItem item={item} gotoComment={gotoComment} />
			</li>
		);
	};
}
