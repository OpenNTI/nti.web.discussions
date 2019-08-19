import React from 'react';
import PropTypes from 'prop-types';
import {DisplayName} from '@nti/web-commons';
import {Hooks, Events} from '@nti/web-session';
import classnames from 'classnames/bind';

import NoteMetadata from './NoteMetadata';
import NotePreview from './NotePreview';
import styles from './View.css';

const cx = classnames.bind(styles);

export default
@Hooks.onEvent(Events.NOTE_UPDATED, 'noteUpdated')
class NoteSummary extends React.Component {
	static propTypes = {
		note: PropTypes.object.isRequired
	}


	noteUpdated (updated) {
		const {note} = this.props;

		if (note === updated) {
			this.forceUpdate();
		} else if (note.getID() === updated.getID()) {
			note.refresh(updated.toJSON()).then(() => this.forceUpdate());
		}
	}


	render () {
		const {note} = this.props;
		const {placeholder} = note;

		return (
			<div className={cx('note-summary', {placeholder})}>
				{!placeholder && (<DisplayName className={cx('author')} entity={note.creator} />)}
				<NotePreview note={note} />
				<NoteMetadata note={note} />
			</div>
		);
	}
}