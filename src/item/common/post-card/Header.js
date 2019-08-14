import React from 'react';
import PropTypes from 'prop-types';
import {User} from '@nti/web-commons';

PostHeader.propTypes = {
	post: PropTypes.object
};
export default function PostHeader ({post}) {
	return (
		<div>
			<User.Avatar user={post.Creator} />
			<User.DisplayName user={post.Creator} />
		</div>
	);
}