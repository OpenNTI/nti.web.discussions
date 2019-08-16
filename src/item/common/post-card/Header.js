import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {User, Text, DateTime} from '@nti/web-commons';

import Styles from './Header.css';

const cx = classnames.bind(Styles);

const DateFormat = 'MMMM D [at] h:mm a';

export default class PostCardHeader extends React.Component {
	static propTypes = {
		post: PropTypes.shape({
			getID: PropTypes.func,
			creator: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
			CreatedTime: PropTypes.object,
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

	render () {
		const {post} = this.props;
		const {loading, containerTitle} = this.state;

		return (
			<div className={cx('post-card-header', {'has-container': !!containerTitle})}>
				<User.Avatar className={cx('avatar')} user={post.creator} />
				{!loading && (
					<div className={cx('meta')}>
						<User.DisplayName className={cx('username')} user={post.creator} tag={Text.Base} />
						<DateTime className={cx('date')} date={post.CreatedTime} format={DateFormat} />
					</div>
				)}
			</div>
		);
	}
}
