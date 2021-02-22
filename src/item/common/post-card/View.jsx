import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import { scoped } from '@nti/lib-locale';
import { LinkTo } from '@nti/web-routing';
import { List } from '@nti/web-commons';

import { Controls } from '../../components';
import Context from '../Context';
import CommentCount from '../CommentCount';
import Report from '../Report';
import ContainerCard from '../ContainerCard';

import Styles from './View.css';
import Comments from './Comments';
import Content from './Content';
import Header from './Header';

const cx = classnames.bind(Styles);
const t = scoped('nti-discussions.item.common.post-card.View', {
	reported: 'Reported',
});

PostCard.propTypes = {
	item: PropTypes.object,
};
export default function PostCard(props) {
	const { item } = props;

	return (
		<LinkTo.Object
			object={item}
			className={cx('post-card', { deleting: Boolean(item.deleting) })}
		>
			<div className={cx('card-context')}>
				<Context {...props} />
			</div>
			<div className={cx('card')}>
				<Controls className={cx('controls')} item={item} />
				<Header {...props} />
				<Content {...props} />
				<ContainerCard className={cx('card-container')} {...props} />
				<div className={cx('footer')}>
					<List.SeparatedInline className={cx('list-items')}>
						<CommentCount {...props} />
						{item.isFlagged && <span>{t('reported')}</span>}
					</List.SeparatedInline>
					<Report className={cx('card-report')} {...props} />
				</div>
				<Comments {...props} />
			</div>
		</LinkTo.Object>
	);
}
