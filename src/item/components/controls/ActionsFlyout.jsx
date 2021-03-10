import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import { Flyout } from '@nti/web-commons';

import Styles from './Styles.css';
import Delete from './Delete';
import Edit from './Edit';
import Pin from './Pin';
import Report from './Report';

const cx = classnames.bind(Styles);

const Actions = [Pin, Edit, Delete, Report];

ActionsFlyout.propTypes = {
	item: PropTypes.object,
	afterDelete: PropTypes.func,
};
export default function ActionsFlyout({ item, afterDelete }) {
	const trigger = (
		<div className={cx('actions-trigger')}>
			<span className={cx('icon')}>...</span>
		</div>
	);
	const available = Actions.filter(action => action.isAvailable(item));

	if (!available.length) {
		return null;
	}

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
							<Cmp
								item={item}
								doClose={doClose}
								afterDelete={afterDelete}
							/>
						</li>
					);
				})}
			</ul>
		</Flyout.Triggered>
	);
}
