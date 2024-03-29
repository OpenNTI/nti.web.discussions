import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import { scoped } from '@nti/lib-locale';
import { Editor, Plugins, Parsers, ContextProvider } from '@nti/web-editor';
import { Errors } from '@nti/web-commons';

import Styles from './Styles.css';

const cx = classnames.bind(Styles);
const t = scoped('nti-discussions.editor.parts.Title', {
	placeholder: 'Add a Title...',
});

const toDraftState = value => Parsers.PlainText.toDraftState(value);
const fromDraftState = draftState =>
	(Parsers.PlainText.fromDraftState(draftState) ?? [])[0];

const { CharacterCounter } = Plugins.Counter.components;
const EditorPlugins = [
	Plugins.Plaintext.create(),
	Plugins.SingleLine.create(),
	Plugins.Counter.create({ character: { limit: 140 } }),
];

const Initial = Symbol('Initial');

DiscussionEditorTitle.propTypes = {
	post: PropTypes.shape({
		title: PropTypes.string,
		setTitle: PropTypes.func,
		titleError: PropTypes.any,
		clearTitleError: PropTypes.func,
	}),
	autoFocus: PropTypes.bool,
	placeholder: PropTypes.string,
};
export default function DiscussionEditorTitle({
	post,
	autoFocus,
	placeholder,
}) {
	const { title, setTitle, titleError, clearTitleError } = post;

	const [editor, setEditor] = useState(null);
	const setEditorRef = ref => {
		if (ref !== editor) {
			setEditor(ref);
		}
	};

	const titleRef = useRef(Initial);
	const [editorState, setEditorState] = useState(null);

	useEffect(() => {
		if (title !== titleRef.current) {
			setEditorState(toDraftState(title));
		}
	}, [title]);

	const onContentChange = newEditorState => {
		const newTitle = fromDraftState(newEditorState) ?? null;

		if (newTitle !== titleRef.current) {
			titleRef.current = newTitle;
			setTitle?.(newTitle);
		}
	};

	const maybeClearError = !titleError
		? null
		: newEditorState => {
				const newTitle = fromDraftState(newEditorState);

				if (newTitle !== titleRef.current) {
					clearTitleError();
				}
		  };

	return (
		<div className={cx('title')}>
			{editorState && (
				<Editor
					ref={setEditorRef}
					plugins={EditorPlugins}
					placeholder={placeholder ?? t('placeholder')}
					editorState={editorState}
					onContentChange={onContentChange}
					contentChangeBuffer={100}
					onChange={maybeClearError}
					autoFocus={autoFocus}
				/>
			)}
			<ContextProvider editor={editor}>
				<>
					<CharacterCounter className={cx('title-limit')} showLimit />
					<Errors.Message
						error={titleError}
						className={cx('title-error')}
					/>
				</>
			</ContextProvider>
		</div>
	);
}
