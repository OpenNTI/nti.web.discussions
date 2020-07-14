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
		title: 'Cancel Post?',
		message: 'You haven\'t finished your post.<br />Are you sure you want to leave?',
		confirm: 'Leave',
		cancel: 'Keep Editing'
	}
});

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

	initialContent: PropTypes.object,

	noSharing: PropTypes.bool,

	afterSave: PropTypes.func,
	onCancel: PropTypes.func,

	bodyPlaceholder: PropTypes.string,
	titlePlaceholder: PropTypes.string,
	saveLabel: PropTypes.string,

	style: PropTypes.oneOf([Full, BodyOnly, NoTitle])
};
export default function DiscussionEditor ({
	className,
	discussion,
	container,
	extraData,

	initialContent,

	noSharing,

	afterSave,
	onCancel,

	bodyPlaceholder,
	titlePlaceholder,
	saveLabel,

	style = Full
}) {
	const explicitCancelRef = React.useRef(false);

	const navPrompt = React.useCallback((cont, stop) => {
		if (explicitCancelRef.current) {
			cont();
			return;
		}

		Prompt.areYouSure(
			t('navWarning.message'),
			t('navWarning.title'),
			{
				confirmButtonLabel: t('navWarning.confirm'),
				cancelButtonLabel: t('navWarning.cancel')
			}
		).then(cont, stop);
	}, []);

	const cancel = onCancel ?
		((...args) => {
			explicitCancelRef.current = true;
			onCancel(...args);

			//Give onCancel a chance to run
			setTimeout(() => {
				explicitCancelRef.current = false;
			}, 100);

		}) :
		null;

	const post = usePostInterface({discussion, initialContent, container, afterSave, extraData});

	let content = null;

	
	if (style === BodyOnly) {
		content = (
			<Container.Body post={post} className={className}>
				<Body post={post} noSharing={noSharing} placeholder={bodyPlaceholder} autoFocus />
				<Controls post={post} onCancel={cancel} saveLabel={saveLabel} />
			</Container.Body>
		);
	} else if (style === NoTitle) {
		content = (
			<Container.NoTitle post={post} className={className}>
				<Identity post={post} />
				<Body post={post} noSharing={noSharing} placeholder={bodyPlaceholder} autoFocus />
				<Controls post={post} onCancel={cancel} saveLabel={saveLabel} />
			</Container.NoTitle>
		);
	} else {
		content = (
			<Container.Full post={post} className={className} >
				<Identity post={post} />
				<Title post={post} placeholder={titlePlaceholder} autoFocus={post.isNew} />
				<Body post={post} noSharing={noSharing} placeholder={bodyPlaceholder} autoFocus={!post.isNew} />
				<Controls post={post} onCancel={cancel} saveLabel={saveLabel} />
			</Container.Full>

		);
	}

	return (
		<Editor.ContextProvider>
			{content}
			<RouterPrompt
				when={post.hasChanged && !post.saving}
				onRoute={navPrompt}
			/>
		</Editor.ContextProvider>
	);
}