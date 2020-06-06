import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {scoped} from '@nti/lib-locale';
import {Text} from '@nti/web-commons';
import {Viewer as Body} from '@nti/web-modeled-content';

import Styles from './Content.css';
import {getBodyOverflowInfo} from './utils';

const cx = classnames.bind(Styles);
const t = scoped('nti-discussions.item.common.post-card.Content', {
	readMore: 'Read More'
});

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
					<div className={cx('body', {overflowing: isOverflowing})}>
						<Body
							className={cx('modeled-content')}
							body={body}
							afterRender={this.afterContentRender}
							style={{maxHeight: `${maxHeight}px`}}
						/>
						{isOverflowing && (
							<div className={cx('overflow')}>
								<Text.Base className={cx('read-more')}>{t('readMore')}</Text.Base>
							</div>
						)}
					</div>
				)}
			</div>
		);
	}
}