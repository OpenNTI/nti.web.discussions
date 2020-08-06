import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {scoped} from '@nti/lib-locale';
import {Text} from '@nti/web-commons';

import Viewer from '../../../viewer';

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
		}),
		item: PropTypes.object
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
		const {post, item} = this.props;
		const {title, body} = post;
		const {isOverflowing, maxHeight} = this.state;

		return (
			<div className={cx('post-card-content')} >
				{title && (<Viewer.Title as="span" className={cx('title')} post={item} />)}
				{body && (
					<div className={cx('body', {overflowing: isOverflowing})}>
						<Viewer.Body
							className={cx('modeled-content')}
							post={item}
							afterRender={this.afterContentRender}
							style={{maxHeight: `${maxHeight}px`}}
							noHighlight
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
