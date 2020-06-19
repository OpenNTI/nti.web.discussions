import React from 'react';
import PropTypes from 'prop-types';
import {HOC} from '@nti/web-commons';
import {Editor} from '@nti/web-modeled-content';

import usePostInterface from './use-post-interface';
import Container from './parts/Container';
import Identity from './parts/Identity';
import Title from './parts/Title';
import Body from './parts/Body';
import Controls from './parts/controls';

const {Variant} = HOC;

const Full = Symbol('Full');
const BodyOnly = Symbol('Body');
const NoTitle = Symbol('No Title');


DiscussionEditor.NoTitle = Variant(DiscussionEditor, {style: NoTitle});
DiscussionEditor.Body = Variant(DiscussionEditor, {style: BodyOnly});
DiscussionEditor.propTypes = {
	className: PropTypes.string,
	discussion: PropTypes.object,
	container: PropTypes.oneOfType([
		PropTypes.object,
		PropTypes.array
	]),
	extraData: PropTypes.object,

	afterSave: PropTypes.func,
	onCancel: PropTypes.func,

	saveLabel: PropTypes.string,

	style: PropTypes.oneOf([Full, BodyOnly, NoTitle])
};
export default function DiscussionEditor ({
	className,
	discussion,
	container,
	extraData,

	afterSave,
	onCancel,

	saveLabel,
	style = Full
}) {
	const post = usePostInterface({discussion, container, afterSave, extraData});

	let content = null;

	
	if (style === BodyOnly) {
		content = (
			<Container.Body post={post} className={className}>
				<Body post={post} />
				<Controls post={post} onCancel={onCancel} saveLabel={saveLabel} />
			</Container.Body>
		);
	} else if (style === NoTitle) {
		content = (
			<Container.NoTitle post={post} className={className}>
				<Identity post={post} />
				<Body post={post} />
				<Controls post={post} onCancel={onCancel} saveLabel={saveLabel} />
			</Container.NoTitle>
		);
	} else {
		content = (
			<Container.Full post={post} className={className} >
				<Identity post={post} />
				<Title post={post} autoFocus />
				<Body post={post} />
				<Controls post={post} onCancel={onCancel} saveLabel={saveLabel} />
			</Container.Full>

		);
	}

	return (
		<Editor.ContextProvider>
			{content}
		</Editor.ContextProvider>
	);
}