import React, { useRef } from 'react';
import classnames from 'classnames/bind';

import { Flyout } from '@nti/web-commons';
import { MenuList } from '@nti/web-core';

import Styles from './Styles.css';
import Delete from './Delete';
import Edit from './Edit';
import Pin from './Pin';
import Report from './Report';

const cx = classnames.bind(Styles);

const Actions = [Pin, Edit, Delete, Report];

const Trigger = React.forwardRef((props, ref) => (
	<div className={cx('actions-trigger')} {...props}>
		<span className={cx('icon')}>...</span>
	</div>
));

/**
 * @param {object} props
 * @param {import('@nti/lib-interfaces').Models.Base} props.item
 * @param {() => void} props.afterDelete
 * @returns {JSX.Element}
 */
export default function ActionsFlyout({ item, afterDelete }) {
	const flyout = useRef();

	const available = Actions.filter(action => action.isAvailable(item));

	return !available?.length ? null : (
		<Flyout.Triggered
			ref={flyout}
			trigger={<Trigger />}
			verticalAlign={Flyout.Triggered.ALIGNMENTS.BOTTOM}
			horizontalAlign={Flyout.Triggered.ALIGNMENTS.RIGHT}
		>
			<MenuList
				options={available.map((Cmp, key) => (
					<Cmp
						key={key}
						item={item}
						doClose={() => flyout.current?.doClose()}
						afterDelete={afterDelete}
					/>
				))}
			/>
		</Flyout.Triggered>
	);
}
