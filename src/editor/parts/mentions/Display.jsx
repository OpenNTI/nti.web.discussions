import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import Styles from './Display.css';

const cx = classnames.bind(Styles);

MentionDisplay.propTypes = {
	children: PropTypes.any,
	suggestion: PropTypes.any,
};
export default function MentionDisplay({ children, suggestion }) {
	return (
		<span
			className={cx('mention-display', {
				'has-suggestion': Boolean(suggestion),
			})}
		>
			{children}
		</span>
	);
}
