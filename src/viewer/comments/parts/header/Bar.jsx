import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {scoped} from '@nti/lib-locale';
import {LinkTo} from '@nti/web-routing';
import {List, Text} from '@nti/web-commons';

import Styles from '../../Styles.css';

import Count from './Count';

const cx = classnames.bind(Styles);
const t = scoped('nti-discussions.viewer.comments.parts.header.Bar', {
	addComment: 'Add a Comment'
});

CommentsHeader.propTypes = {
	post: PropTypes.shape({
		canAddComment: PropTypes.func
	})
};
export default function CommentsHeader (props) {
	const {post} = props;

	return (
		<div className={cx('comments-header')}>
			<List.SeparatedInline>
				<Count {...props} />
				{post?.canAddComment() && (
					<LinkTo.Object object={post} context="reply" className={cx('add-comment')}>
						<Text.Base>
							{t('addComment')}
						</Text.Base>
					</LinkTo.Object>
				)}
			</List.SeparatedInline>
		</div>
	);
}