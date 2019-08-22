import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {Loading, User, Text, DateTime} from '@nti/web-commons';
import {TextPreview} from '@nti/web-modeled-content';
import {LinkTo} from '@nti/web-routing';

import Styles from './Comment.css';

const cx = classnames.bind(Styles);
const Placeholder = 'placeholder';
const DateFormat = 'MMM D [at] h:mm a';

PostCardComment.Placeholder = Placeholder;
PostCardComment.propTypes = {
	comment: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.shape({
			creator: PropTypes.object,
			body: PropTypes.any,
			getCreatedTime: PropTypes.func
		})
	])
};
export default function PostCardComment ({comment}) {
	const loading = comment === Placeholder;
	const skeleton = (
		<div className={cx('comment', 'skeleton')}>
			<div className={cx('avatar', 'skeleton')} />
			<div className={cx('meta')}>
				<div className={cx('display', 'skeleton')} />
				<div className={cx('content', 'skeleton')} />
			</div>
		</div>
	);

	return (
		<Loading.Placeholder loading={loading} fallback={skeleton} delay={0}>
			{!loading && (
				<LinkTo.Object object={comment} className={cx('comment')}>
					<User.Avatar className={cx('avatar')} user={comment.creator} />
					<div className={cx('meta')}>
						<div className={cx('display')}>
							<User.DisplayName className={cx('username')} user={comment.creator} tag={Text.Base} />
							<DateTime className={cx('date')} date={comment.getCreatedTime()} format={DateFormat} />
						</div>
						<TextPreview
							className={cx('content')}
							body={comment.body}
							limitLines={2}
							overflow={Text.Overflow.Ellipsis}
						/>
					</div>
				</LinkTo.Object>
			)}

		</Loading.Placeholder>
	);
}