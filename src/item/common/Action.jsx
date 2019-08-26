import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {Text, User} from '@nti/web-commons';

import Styles from './Action.css';

const cx = classnames.bind(Styles);

export default class DiscussionItemAction extends React.Component {
	static propTypes = {
		className: PropTypes.string,
		post: PropTypes.shape({
			getID: PropTypes.func,
			creator: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
			getActionString: PropTypes.func,
			getContainerTitle: PropTypes.func
		})
	}

	state = {loading: true, containerTitle: null}

	componentDidMount () {
		this.setup();
	}

	componentDidUpdate (prevProps) {
		const {post} = this.props;
		const {post:prevPost} = prevProps;

		if (post.getID() !== prevPost.getID()) {
			this.setState({loading: true, containerTitle: null}, () => this.setup());
		}
	}

	async setup () {
		const {post} = this.props;

		try {
			const containerTitle = await post.getContainerTitle();

			this.setState({
				loading: false,
				containerTitle
			});
		} catch (e) {
			this.setState({
				loading: false,
				containerTitle: null
			});
		}
	}


	getLocale = ({name}) => {
		const {post} = this.props;
		const {containerTitle} = this.state;

		if (!post.getActionString) { return name; }

		return post.getActionString(
			name,
			containerTitle ? `<span class="${cx('container-title')}">${containerTitle}</span>` : ''
		);
	}


	render () {
		const {post, className} = this.props;
		const {loading, containerTitle} = this.state;

		return (
			<Text.Base className={cx('discussion-item-action-label', className, {'has-title': containerTitle})}>
				{!loading && (
					<User.DisplayName
						className={cx('action-username')}
						user={post.creator}
						localeKey={this.getLocale}
					/>
				)}
			</Text.Base>
		);
	}
}