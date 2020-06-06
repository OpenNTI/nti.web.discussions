import React from 'react';
import PropTypes from 'prop-types';
import {Editor} from '@nti/web-modeled-content';

import Container from './parts/Container';
import Identity from './parts/Identity';

DiscussionEditor.propTypes = {
	className: PropTypes.string,
	discussion: PropTypes.shape({
		Creator: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
		title: PropTypes.string
	})
};
export default function DiscussionEditor ({className, discussion}) {
	return (
		<Editor.ContextProvider>
			<Container>
				<Identity creator={discussion.Creator} />
			</Container>
		</Editor.ContextProvider>
	);
}