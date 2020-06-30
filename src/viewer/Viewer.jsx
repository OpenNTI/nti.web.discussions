import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {scoped} from '@nti/lib-locale';
import {StandardUI} from '@nti/web-commons';
import {Router} from '@nti/web-routing';

import Styles from './Viewer.css';
import Body from './body';
import Post from './post';
import Comments from './comments';

const cx = classnames.bind(Styles);
const t = scoped('nti-discussions.viewer.Viewer', {
	dialog: {
		title: 'Posted in %(title)s',
		noTitle: 'Discussion'
	}
});

const getDialogTitle = (discussion) => {
	if (!discussion?.ContainerTitle) { return t('dialog.noTitle'); }

	return t('dialog.title', {title: discussion.ContainerTitle});
};

DiscussionViewer.Body = Body;
DiscussionViewer.propTypes = {
	className: PropTypes.string,
	discussion: PropTypes.shape({
		ContainerTitle: PropTypes.string
	}),
	container: PropTypes.oneOfType([
		PropTypes.object,
		PropTypes.array
	]),

	dialog: PropTypes.bool,
	onClose: PropTypes.func
};
export default function DiscussionViewer ({className, discussion, container, dialog, onClose}) {
	const Cmp = dialog ? StandardUI.Card : 'article';

	const getRouteFor = (obj, context) => {
		if (obj === discussion && context === 'edit') {
			return {
				replace: true,
				href: './#edit'
			};
		}
	};

	return (
		<Router.RouteForProvider getRouteFor={getRouteFor}>
			<Cmp
				{...(dialog ? ({as: 'article', rounded: true}) : ({}))}
				className={cx('discussion-viewer', 'x-selectable', className, {dialog})}
			>
				{dialog && (
					<StandardUI.Window.TitleBar
						onClose={onClose}
						title={getDialogTitle(discussion)}
					/>
				)}
				<Post post={discussion} container={container} afterDelete={onClose}/>
				<Comments post={discussion} container={container} />
			</Cmp>
		</Router.RouteForProvider>
	);
}