import React from 'react';
import PropTypes from 'prop-types';
import {Editor} from '@nti/web-modeled-content';

import usePostInterface from './use-post-interface';
import Container from './parts/Container';
import Identity from './parts/Identity';
import Title from './parts/Title';
import Body from './parts/Body';
import Controls from './parts/controls';

DiscussionEditor.propTypes = {
	className: PropTypes.string,
	discussion: PropTypes.object,
	container: PropTypes.oneOfType([
		PropTypes.object,
		PropTypes.array
	]),

	dialog: PropTypes.bool,
	afterSave: PropTypes.func
};
export default function DiscussionEditor ({className, discussion, container, dialog, afterSave}) {
	const post = usePostInterface({discussion, container, afterSave});

	return (
		<Editor.ContextProvider>
			<Container dialog={dialog} post={post}>
				<Identity post={post} />
				<Title post={post} />
				<Body post={post} />
				<Controls post={post} />
			</Container>
		</Editor.ContextProvider>
	);
}