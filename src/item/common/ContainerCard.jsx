import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import { Text } from '@nti/web-commons';

import Styles from './ContainerCard.css';

const cx = classnames.bind(Styles);

export default class DiscussionItemContainerCard extends React.Component {
	static propTypes = {
		className: PropTypes.string,
		post: PropTypes.shape({
			getID: PropTypes.func,
			getContainerInfo: PropTypes.func,
		}),
	};

	state = { container: null };

	get shouldShow() {
		const { post } = this.props;

		return post && !!post.getContainerInfo;
	}

	componentDidMount() {
		this.setup();
	}

	componentDidUpdate(prevProps) {
		const { post } = this.props;
		const { post: prevPost } = prevProps;

		if (post.getID() !== prevPost.getID()) {
			this.setState({ container: null, errored: false }, () =>
				this.setup()
			);
		}
	}

	async setup() {
		const { post } = this.props;

		if (!this.shouldShow) {
			return;
		}

		try {
			const container = await post.getContainerInfo();

			this.setState({
				errored: false,
				container,
			});
		} catch (e) {
			this.setState({
				errored: true,
			});
		}
	}

	render() {
		const { container, errored } = this.state;

		if (!this.shouldShow || errored) {
			return null;
		}

		const { className } = this.props;
		const skeleton = !container;

		return (
			<div
				className={cx('discussion-item-container-card', className, {
					skeleton,
				})}
			>
				{container && container.icon && (
					<div
						className={cx('icon', container.iconClass)}
						style={{ backgroundImage: `url(${container.icon})` }}
					/>
				)}
				<div className={cx('meta')}>
					<Text.Base className={cx('label', { skeleton })}>
						{container?.label || ''}
					</Text.Base>
					<Text.Base
						limitLines={2}
						className={cx('title', { skeleton })}
					>
						{container?.title || ''}
					</Text.Base>
				</div>
			</div>
		);
	}
}
