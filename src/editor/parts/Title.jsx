import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {scoped} from '@nti/lib-locale';
import {Editor, Plugins, Parsers, ContextProvider} from '@nti/web-editor';

import Styles from './Styles.css';

const cx = classnames.bind(Styles);
const t = scoped('nti-discussions.editor.parts.Title', {
	placeholder: 'Title'
});

const toDraftState = value => Parsers.PlainText.toDraftState(value);
const fromDraftState = draftState => (Parsers.PlainText.fromDraftState(draftState) ?? [])[0];

const {CharacterCounter} = Plugins.Counter.components;
const EditorPlugins = [
	Plugins.Plaintext.create(),
	Plugins.SingleLine.create(),
	Plugins.Counter.create({character: {limit: 140}})
];

DiscussionEditorTitle.propTypes = {
	title: PropTypes.string,
	onChange: PropTypes.func
};
export default function DiscussionEditorTitle ({title, onChange}) {
	const [editor, setEditor] = React.useState(null);
	const setEditorRef = (ref) => {
		if (ref !== editor) { setEditor(ref); }
	};

	const titleRef = React.useRef(null);
	const [editorState, setEditorState] = React.useState(null);

	React.useEffect(() => {
		if (!titleRef.current || title !== titleRef.current) {
			setEditorState(toDraftState(title));
		}
	}, [title]);


	const onContentChange = (newEditorState) => {
		const newTitle = fromDraftState(newEditorState);

		titleRef.current = newTitle;
		onChange?.(newTitle);
	};

	return (
		<div className={cx('title')}>
			{editorState && (
				<Editor
					ref={setEditorRef}
					plugins={EditorPlugins}
					placeholder={t('placeholder')}
					editorState={editorState}
					onContentChange={onContentChange}
				/>
			)}
			<ContextProvider editor={editor}>
				<CharacterCounter className={cx('title-limit')} showLimit/>
			</ContextProvider>
		</div>
	);
}