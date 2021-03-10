import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import { LinkTo } from '@nti/web-routing';
import { FillToBottom } from '@nti/web-commons';

import Styles from './View.css';
import Summary from './summary';
import EmptyState from './EmptyState';

const cx = classnames.bind(Styles);

export default class NotesSidebar extends React.Component {
	static propTypes = {
		className: PropTypes.string,

		notes: PropTypes.array,
		fillToBottom: PropTypes.bool,
		sticky: PropTypes.bool,

		onNewNote: PropTypes.func,
	};

	render() {
		const { className, fillToBottom, sticky } = this.props;
		const cls = cx('note-sidebar', className, {
			sticky,
			fill: fillToBottom,
		});
		const content = this.renderNoteList();

		return fillToBottom ? (
			<FillToBottom className={cls} limit padding={18}>
				{content}
			</FillToBottom>
		) : (
			<div className={cls}>{content}</div>
		);
	}

	renderNoteList() {
		const { notes = [], onNewNote } = this.props;
		const loading = !notes;
		const empty = !(notes || []).length;

		if (loading) {
			return null;
		}
		if (empty) {
			return <EmptyState onNewNote={onNewNote} />;
		}

		return (
			<ul className={cx('note-list')}>
				{notes.map(note => {
					return (
						<li key={note.getID()}>
							<LinkTo.Object object={note}>
								<Summary note={note} />
							</LinkTo.Object>
						</li>
					);
				})}
			</ul>
		);
	}
}
