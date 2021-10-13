import classnames from 'classnames/bind';

import Sharing from '../../sharing';
import Styles from '../Styles.css';

const cx = classnames.bind(Styles);

export default function DiscussionBody(props) {
	return <Sharing {...props} className={cx('sharing')} />;
}
