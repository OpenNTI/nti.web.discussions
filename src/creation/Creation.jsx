import React from 'react';
import PropTypes from 'prop-types';

import Container from './parts/Container';
import Header from './parts/Header';
import Editor from './parts/Editor';

DiscussionCreation.propTypes = {
	container: PropTypes.any,
	initialContainer: PropTypes.any,

	dialog: PropTypes.bool,
	small: PropTypes.bool
};
export default function DiscussionCreation ({container:containerProp, initialContainer, dialog, small, ...otherProps}) {
	const [container, setContainer] = React.useState(null);

	React.useEffect(() => {
		setContainer(containerProp ?? initialContainer);
	}, [containerProp, initialContainer]);

	return (
		<Container dialog={dialog} small={small}>
			<Header {...otherProps} small={small} container={container} setContainer={setContainer} />
			{container && (
				<Editor {...otherProps} container={container} />
			)}
		</Container>
	);
}