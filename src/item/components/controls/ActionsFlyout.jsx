import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {Flyout} from '@nti/web-commons';

import Styles from './Styles.css';
import Delete from './Delete';
import Edit from './Edit';
import Pin from './Pin';

const cx = classnames.bind(Styles);

const Actions = [
	Pin,
	Edit,
	Delete
];

ActionsFlyout.propTypes = {
	item: PropTypes.object
};
export default function ActionsFlyout ({item}) {
	const trigger = (<div className={cx('actions-trigger')}>...</div>);
	const available = Actions.filter(action => action.isAvailable(item));

	if (!available.length) { return null; }

	const flyout = React.useRef();
	const doClose = () => {
		if (flyout.current) {
			flyout.current.doClose();
		}
	};

	return (
		<Flyout.Triggered
			ref={flyout}
			trigger={trigger}
			verticalAlign={Flyout.Triggered.ALIGNMENTS.BOTTOM}
			horizontalAlign={Flyout.Triggered.ALIGNMENTS.RIGHT}
		>
			<ul className={cx('discussion-item-actions')}>
				{available.map((Cmp, key) => {
					return (
						<li key={key}>
							<Cmp item={item} doClose={doClose}/>
						</li>
					);
				})}
			</ul>
		</Flyout.Triggered>
	);
}