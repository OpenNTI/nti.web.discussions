import React from 'react';
import PropTypes from 'prop-types';
import {rawContent} from '@nti/lib-commons';

const styles = css`
	.highlight {
		background-color: #eaeaaa;
	}
`;

HighlightedContent.propTypes = {
	content: PropTypes.string,
	term: PropTypes.string
};

export default function HighlightedContent ({ children, content, term, ...props }) {
	if (!content || typeof children === 'string') {
		content = children;
	}
	if(!content || !term || term === '') {
		return (<div {...props}>{content}</div>);
	}

	let startIndex = 0;
	let results = [];
	let nonHighlightedText = '';

	content = toHTML(content);

	while(startIndex < content.length) {
		if(content.substring(startIndex, startIndex + term.length).toLowerCase() === term.toLowerCase()) {
			if(nonHighlightedText.length > 0) {
				results.push('<span>', nonHighlightedText, '</span>');
				nonHighlightedText = '';
			}
			results.push(`<span class="${styles.highlight}">`, content.substring(startIndex, startIndex + term.length), '</span>');
			startIndex += term.length;
		}
		else {
			nonHighlightedText += content.charAt(startIndex);
			startIndex++;
		}
	}

	if(nonHighlightedText.length > 0) {
		results.push('<span>', nonHighlightedText, '</span>');
	}

	return (<div {...props} {...rawContent(results.join(''))}/>);
}


function toHTML (str) {
	const span = document.createElement('span');
	const textNode = document.createTextNode(str);
	span.appendChild(textNode);
	return span.innerHTML;
}
