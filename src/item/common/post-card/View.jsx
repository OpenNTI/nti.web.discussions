import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {LinkTo} from '@nti/web-routing';

import {Controls} from '../../components';
import Context from '../Context';
import CommentCount from '../CommentCount';
import Report from '../Report';
import ContainerCard from '../ContainerCard';

import Styles from './View.css';
import Comments from './Comments';
import Content from './Content';
import Header from './Header';

const cx = classnames.bind(Styles);

PostCard.propTypes = {
	item: PropTypes.object
};
export default function PostCard (props) {
	const {item} = props;

	return (
		<LinkTo.Object object={item} className={cx('post-card')}>
			<div className={cx('card-context')}>
				<Context {...props} />
			</div>
			<div className={cx('card')}>
				<Controls className={cx('controls')} item={item} />
				<Header {...props} />
				<Content {...props} />
				<ContainerCard className={cx('card-container')} {...props} />
				<div className={cx('footer')}>
					<CommentCount {...props} />
					<Report className={cx('card-report')} {...props} />
				</div>
				<Comments {...props} />
			</div>
		</LinkTo.Object>
	);
}