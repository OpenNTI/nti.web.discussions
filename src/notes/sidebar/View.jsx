import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {scoped} from '@nti/lib-locale';
import {LinkTo} from '@nti/web-routing';
import {EmptyState, FillToBottom} from '@nti/web-commons';

import Styles from './View.css';
import Summary from './summary';

const cx = classnames.bind(Styles);

const t = scoped('discussions.notes.sidebar.View', {
	empty: 'There are no discussions yet.'
});

export default class NotesSidebar extends React.Component {
	static propTypes = {
		className: PropTypes.string,

		notes: PropTypes.array,
		emptyText: PropTypes.string,
		fillToBottom: PropTypes.bool,
		sticky: PropTypes.bool
	}

	render () {
		const {className, fillToBottom, sticky} = this.props;
		const cls = cx('note-sidebar', className, {sticky, fill: fillToBottom});
		const content = this.renderNoteList();

		return fillToBottom ?
			(<FillToBottom className={cls} limit padding={18}>{content}</FillToBottom>) :
			(<div className={cls}>{content}</div>);
	}

	renderNoteList () {
		const {notes = [], emptyText} = this.props;
		const loading = !notes;
		const empty = !(notes || []).length;

		if (loading) { return null; }
		if (empty) { return (<EmptyState subHeader={emptyText || t('empty')} />); }

		return (
			<ul className={cx('note-list')}>
				{notes.map((note) => {
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
