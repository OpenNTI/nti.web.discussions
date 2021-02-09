import './ForumItem.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {decorate} from '@nti/lib-commons';
import { LinkTo } from '@nti/web-routing';
import { HOC } from '@nti/web-commons';
import { scoped } from '@nti/lib-locale';
import { Viewer } from '@nti/web-reports';

const DEFAULT_TEXT = {
	count: {
		zero: 'No Discussions',
		one: '1 Discussion',
		other: '%(count)s Discussions'
	}
};

const t = scoped('forums.topic', DEFAULT_TEXT);

class ForumItem extends React.Component {
	static propTypes = {
		item: PropTypes.shape({
			displayTitle: PropTypes.string,
			title: PropTypes.string.isRequired,
			edit: PropTypes.func.isRequired,
			TopicCount: PropTypes.number.isRequired,
			hasLink: PropTypes.func.isRequired,
			Links: PropTypes.array.isRequired,
			Reports: PropTypes.array
		}).isRequired,
	}

	static contextTypes = {
		router: PropTypes.object
	}

	showReports = (e) => {
		e.preventDefault();

		const report = this.props.item.Reports[0];

		Viewer.show(report);
	}

	render () {
		const { item } = this.props;

		const canShowReports = item.Links.some(x => x.rel.startsWith('report-')) && item.Reports;

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
						{canShowReports && (
							<div className="forum-item-reports" onClick={this.showReports}>
								<i className="icon-report" />
							</div>
						)}
					</div>
				</LinkTo.Object>
			</li>
		);
	}
}


export default decorate(ForumItem, [
	HOC.ItemChanges.compose
]);
