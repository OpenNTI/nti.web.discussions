import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {Layouts, HOC} from '@nti/web-commons';

import Styles from './Styles.css';
import Context from './Context';

const cx = classnames.bind(Styles);
const {Responsive} = Layouts;
const {Variant} = HOC;

const classList = [
	{query: size => size.width >= 575, className: cx('large')},
	{query: size => size.width < 575, className: cx('small')}
];

const Full = cx('full');
const Body = cx('body-only');
const NoTitle = cx('no-title');

DiscussionEditorContainer.Full = Variant(DiscussionEditorContainer, {style: Full});
DiscussionEditorContainer.Body = Variant(DiscussionEditorContainer, {style: Body});
DiscussionEditorContainer.NoTitle = Variant(DiscussionEditorContainer, {style: NoTitle});
DiscussionEditorContainer.propTypes = {
	className: PropTypes.string,
	post: PropTypes.shape({
		saving: PropTypes.bool
	}),

	style: PropTypes.oneOf([Full, Body, NoTitle]),

	children: PropTypes.any
};
export default function DiscussionEditorContainer ({className, post, style = Full, children, ...otherProps}) {
	const [overlay, setOverlay] = React.useState(null);

	const OverlayCmp = overlay?.Cmp;
	const overlayProps = overlay?.props;

	return (
		<Context.Provider value={{setOverlay}}>
			<Responsive.ClassList
				{...otherProps}
				className={cx('discussion-editor-container', className, style, {saving: post?.saving})}
				classList={classList}
			>
				{children}
				{OverlayCmp && (
					<OverlayCmp {...overlayProps} />
				)}
			</Responsive.ClassList>
		</Context.Provider>
	);
}