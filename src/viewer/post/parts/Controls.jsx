import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import { Controls } from '../../../item';
import Styles from '../Styles.css';

const cx = classnames.bind(Styles);

DiscussionControls.propTypes = {
	post: PropTypes.object,
	afterDelete: PropTypes.func,
};
export default function DiscussionControls({ post, afterDelete }) {
	if (!post) {
		return null;
	}

	return (
		<Controls
			item={post}
			className={cx('controls')}
			afterDelete={afterDelete}
		/>
	);
}
