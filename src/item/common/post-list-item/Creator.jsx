import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {User, Text} from '@nti/web-commons';

import Styles from './Creator.css';

const cx = classnames.bind(Styles);

export default class PostCardCreator extends React.Component {
	static propTypes = {
		post: PropTypes.shape({
			getID: PropTypes.func,
			creator: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
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
			this.setState({loading: true, container: null}, () => this.setup());
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

		//TODO: if there is a container title display it

		return (
			<div className={cx('post-list-item-creator', {'has-container': !!containerTitle})}>
				{!loading && (
					<User.DisplayName className={cx('name')} user={post.creator} tag={Text.Base} />
				)}
			</div>
		);
	}
}