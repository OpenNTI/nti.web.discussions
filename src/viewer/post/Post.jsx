import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {StandardUI} from '@nti/web-commons';
import {Route, Router} from '@nti/web-routing';

import Editor from '../../editor';

import Styles from './Styles.css';
import Body from './parts/Body';
import Controls from './parts/Controls';
import Identity from './parts/Identity';
import Info from './parts/Info';
import Title from './parts/Title';

const cx = classnames.bind(Styles);

DiscussionPost.propTypes = {
	post: PropTypes.object
};
export default function DiscussionPost (props) {
	const {post} = props;

	const router = Router.useRouter();
	const closeEdit = () => router.routeTo.path('./');

	return (
		<div className={cx('discussion-post-container', 'large')}>
			<Route.Hash
				matches="#edit"
				render={() => (
					<div className={cx('discussion-post-editor-container')}>
						<StandardUI.Card className={cx('editor-inner')} rounded >
							<Editor
								className={cx('discussion-post-editor')}
								{...props}
								discussion={post}
								afterSave={closeEdit}
								onCancel={closeEdit}
							/>
						</StandardUI.Card>
					</div>
				)}
			/>
			<Route.Hash
				matches={(hash) => hash !== '#edit'}
				render={() => (
					<div className={cx('discussion-post')}>
						<Controls {...props} />
						<Identity {...props} />
						<Title {...props} />
						<Info {...props} />
						<Body {...props} />
					</div>
				)}
			/>
		</div>
	);
}