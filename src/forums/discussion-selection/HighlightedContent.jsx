import React from 'react';
import PropTypes from 'prop-types';

HighlightedContent.propTypes = {
	content: PropTypes.string,
	term: PropTypes.string
};

export default function HighlightedContent ({ content, term }) {
	if(!content || !term || term === '') {
		return (<div>{content}</div>);
	}

	let startIndex = 0;
	let results = [];
	let nonHighlightedText = '';

	while(startIndex < content.length) {
		if(content.substring(startIndex, startIndex + term.length).toLowerCase() === term.toLowerCase()) {
			if(nonHighlightedText.length > 0) {
				results.push(<span key={startIndex}>{nonHighlightedText}</span>);
				nonHighlightedText = '';
			}
			results.push(<span key={startIndex + '--highlight'} className="highlight">{content.substring(startIndex, startIndex + term.length)}</span>);
			startIndex += term.length;
		}
		else {
			nonHighlightedText += content.charAt(startIndex);
			startIndex++;
		}
	}

	if(nonHighlightedText.length > 0) {
		results.push(<span key={startIndex}>{nonHighlightedText}</span>);
	}

	return (<div>{results}</div>);
}
