import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {Text} from '@nti/web-commons';
import {Panel as Body} from '@nti/web-modeled-content';

import Styles from './Content.css';
import {getBodyOverflowInfo} from './utils';

const cx = classnames.bind(Styles);

const DesiredMaxHeight = 315;

export default class PostCardContent extends React.Component {
	static propTypes = {
		post: PropTypes.shape({
			title: PropTypes.string,
			body: PropTypes.any
		})
	}

	state = {maxHeight: DesiredMaxHeight}

	afterContentRender = (body) => {
		const {isOverflowing, maxHeight} = getBodyOverflowInfo(body, DesiredMaxHeight);

		this.setState({
			isOverflowing,
			maxHeight
		});
	}

	render () {
		const {post} = this.props;
		const {title, body} = post;
		const {isOverflowing, maxHeight} = this.state;

		return (
			<div className={cx('post-card-content')} >
				{title && (<Text.Base className={cx('title')}>{title}</Text.Base>)}
				{body && (
					<div className={cx('body', {overflowing: isOverflowing})} style={{maxHeight: `${maxHeight}px`}}>
						<Body body={body} afterRender={this.afterContentRender} />
					</div>
				)}
			</div>
		);
	}
}