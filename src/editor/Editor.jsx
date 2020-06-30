import React from 'react';
import PropTypes from 'prop-types';
import {scoped} from '@nti/lib-locale';
import {HOC, Prompt} from '@nti/web-commons';
import {Editor} from '@nti/web-modeled-content';
import {Prompt as RouterPrompt} from '@nti/web-routing';

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

const t = scoped('nti-discussions.editor.Editor', {
	navWarning: {
		title: 'Are you sure?',
		message: 'You currently have unsaved changes. Would you like to leave without saving?',
		confirm: 'Leave',
		cancel: 'Stay'
	}
});

const navDialog = (cont, stop) => (
	Prompt.areYouSure(
		t('navWarning.message'),
		t('navWarning.title'),
		{
			confirmButtonLabel: t('navWarning.confirm'),
			cancelButtonLabel: t('navWarning.cancel')
		}
	).then(cont, stop)
);

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

	noSharing: PropTypes.bool,

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

	noSharing,

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
				<Body post={post} noSharing={noSharing} autoFocus />
				<Controls post={post} onCancel={onCancel} saveLabel={saveLabel} />
			</Container.Body>
		);
	} else if (style === NoTitle) {
		content = (
			<Container.NoTitle post={post} className={className}>
				<Identity post={post} />
				<Body post={post} noSharing={noSharing} autoFocus />
				<Controls post={post} onCancel={onCancel} saveLabel={saveLabel} />
			</Container.NoTitle>
		);
	} else {
		content = (
			<Container.Full post={post} className={className} >
				<Identity post={post} />
				<Title post={post} autoFocus />
				<Body post={post} noSharing={noSharing} />
				<Controls post={post} onCancel={onCancel} saveLabel={saveLabel} />
			</Container.Full>

		);
	}

	return (
		<Editor.ContextProvider>
			{content}
			<RouterPrompt
				when={post.hasChanged && !post.saving}
				onRoute={navDialog}
			/>
		</Editor.ContextProvider>
	);
}