import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {Viewer} from '@nti/web-reports';

import Styles from './Report.css';

const cx = classnames.bind(Styles);

export default class DiscussionItemReport extends React.Component {
	static propTypes = {
		className: PropTypes.string,
		post: PropTypes.shape({
			getReport: PropTypes.func
		})
	}

	launchReport = (e) => {
		e.stopPropagation();
		e.preventDefault();

		const {post} = this.props;

		Viewer.show(post.getReport());
	}

	render () {
		const {className, post} = this.props;

		if (!post || !post.getReport || !post.getReport()) { return null; }

		return (
			<button type="button" className={cx('dicusssion-item-report', className)} onClick={this.launchReport}>
				<i className={cx('icon-report', 'icon')} />
			</button>
		);
	}
}
