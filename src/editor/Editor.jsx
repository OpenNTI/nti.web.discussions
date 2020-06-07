import React from 'react';
import PropTypes from 'prop-types';
import {Editor} from '@nti/web-modeled-content';

import Container from './parts/Container';
import Identity from './parts/Identity';
import Title from './parts/Title';
import Body from './parts/Body';
import Controls from './parts/controls';

DiscussionEditor.propTypes = {
	className: PropTypes.string,
	discussion: PropTypes.shape({
		Creator: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
		title: PropTypes.string
	})
};
export default function DiscussionEditor ({className, discussion}) {
	const [title, setTitle] = React.useState(null);
	const [body, setBody] = React.useState(null);

	React.useEffect(() => {
		setTitle(discussion?.title);
		setBody(discussion?.body);
	}, [discussion]);

	return (
		<Editor.ContextProvider>
			<Container>
				<Identity creator={discussion?.Creator} />
				<Title title={title} onChange={setTitle} />
				<Body body={body} onChange={setBody} />
				<Controls />
			</Container>
		</Editor.ContextProvider>
	);
}