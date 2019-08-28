import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {Text, User} from '@nti/web-commons';

import Styles from './Action.css';

const cx = classnames.bind(Styles);


export default class DiscussionItemAction extends React.Component {
	static propTypes = {
		className: PropTypes.string,
		context: PropTypes.object,
		post: PropTypes.shape({
			creator: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
			getActionString: PropTypes.func
		})
	}


	getLocale = ({name}) => {
		const {post, context} = this.props;

		if (!post.getActionString) { return name; }

		return post.getActionString(name, context && context.getID && context.getID(), (title) => `<span class="${cx('container-title')}">${title}</span>`);
	}


	render () {
		const {post, className} = this.props;

		return (
			<Text.Base className={cx('discussion-item-action-label', className)}>
				<User.DisplayName
					className={cx('action-username')}
					user={post.creator}
					localeKey={this.getLocale}
				/>
			</Text.Base>
		);
	}
}