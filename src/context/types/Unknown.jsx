import React from 'react';
import PropTypes from 'prop-types';

Unknown.propTypes = {
	item: PropTypes.object
};
export default function Unknown ({item}) {
	return (
		<div className="unknown-context-type">
			Unknown: {item.MimeType || item.type || JSON.stringify(item)}
		</div>
	);
}
