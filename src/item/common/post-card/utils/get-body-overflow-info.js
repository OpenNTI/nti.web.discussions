import {isTextNode} from '@nti/lib-dom';

const WHITEBOARD_RATIO = 1.618;//width / height
const PARAGRAPH = 'P';

const isObject = node => node.tagName === 'OBJECT';
const isWhiteboard = node => node.classList.contains('whiteboard');
const isVideo = node => node.classList.contains('nti-video');

function isLeafNode (node) {
	if (!node) { return false; }
	if (node.tagName === PARAGRAPH) { return true; }
	if (isTextNode(node.firstChild)) { return true; }
	if (isObject(node)) { return true; }
	if (isWhiteboard(node)) { return true; }
	if (isVideo(node)) { return true; }
}


function shouldShowInFull (node) {
	return isObject(node) || isWhiteboard(node) || isVideo(node);
}

function getHeight (node) {
	if (isWhiteboard(node)) {
		return Math.ceil((1 / WHITEBOARD_RATIO) * node.clientWidth);
	}

	return node.clientHeight;
}

export default function getBodyOverflowInfo (body, desiredMax) {
	if (!global.document) { return {isOverflowing: true, maxHeight: desiredMax}; }

	const walker = document.createTreeWalker(
		body,
		global.NodeFilter.SHOW_ELEMENT,
		{
			acceptNode: (node) => {
				if (isLeafNode(node)) {
					return global.NodeFilter.FILTER_ACCEPT;
				}

				return global.NodeFilter.FILTER_SKIP;
			}
		},
		false
	);

	let knownHeight = 0;
	
	while (walker.nextNode()) {
		const node = walker.currentNode;
		const height = getHeight(node);

		if (shouldShowInFull(node)) {
			knownHeight += height;
		} else {
			knownHeight = Math.min(desiredMax, knownHeight + height);
		}

		if (knownHeight >= desiredMax) {
			break;
		}
	}

	return {
		isOverflowing: Boolean(walker.nextNode()),
		maxHeight: Math.max(desiredMax, knownHeight)
	};
}