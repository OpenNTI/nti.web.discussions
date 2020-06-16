import React from 'react';
import classnames from 'classnames/bind';
import {Route} from '@nti/web-routing';

import Styles from './Styles.css';
import Controls from './parts/Controls';
import Identity from './parts/Identity';
import Title from './parts/Title';
import Info from './parts/Info';

const cx = classnames.bind(Styles);

export default function DiscussionPost (props) {
	return (
		<>
			<Route.Hash
				matches="#edit"
				render={() => (
					<div>
						Edit
					</div>
				)}
			/>
			<Route.Hash
				matches={(hash) => hash !== '#edit'}
				render={() => (
					<div className={cx('discussion-post', 'large')}>
						<Controls {...props} />
						<Identity {...props} />
						<Title {...props} />
						<Info {...props} />
					</div>
				)}
			/>
		</>
	);
}