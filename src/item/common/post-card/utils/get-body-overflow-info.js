import {isTextNode} from '@nti/lib-dom';

const PARAGRAPH = 'P';

const isObject = node => node.tagName === 'OBJECT';
const isWhiteboard = node => node.classList.contains('whiteboard');
const isVideo = node => node.classList.contains('nti-video');

const isInObject = (node, body) => {
	let pointer = node.parentNode;

	while (pointer && pointer !== body) {
		if (isObject(pointer)) { return true; }
		pointer = pointer.parentNode;
	}

	return false;
};

function isLeafNode (node, body) {
	if (!node) { return false; }
	if (isInObject(node)) { return false; }
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
	if (!global.getComputedStyle) { return node.clientHeight; }

	const style = global.getComputedStyle(node);
	const marginTop = parseFloat(style['marginTop'], 10) || 0;
	const marginBottom = parseFloat(style['marginBottom'], 10) || 0;

	return Math.ceil(node.clientHeight + marginTop + marginBottom);
}

export default function getBodyOverflowInfo (body, desiredMax) {
	if (!global.document) { return {isOverflowing: true, maxHeight: desiredMax}; }

	try {
		const walker = document.createTreeWalker(
			body,
			global.NodeFilter.SHOW_ELEMENT,
			{
				acceptNode: (node) => {
					if (isLeafNode(node, body)) {
						return global.NodeFilter.FILTER_ACCEPT;
					}

					return global.NodeFilter.FILTER_SKIP;
				}
			},
			false
		);

		let knownHeight = 0;
		let maxHeight = 0;
		
		while (walker.nextNode()) {
			const node = walker.currentNode;
			const height = getHeight(node);

			knownHeight += height;

			if (shouldShowInFull(node)) {
				maxHeight += height;
			} else {
				maxHeight = Math.min(desiredMax, maxHeight + height);
			}

			if (knownHeight >= desiredMax) {
				break;
			}
		}


		const adjustedMax = Math.max(desiredMax, maxHeight);

		return {
			isOverflowing: Boolean(walker.nextNode()) || knownHeight > adjustedMax,
			maxHeight: adjustedMax
		};
	} catch (e) {
		return {
			isOverflow: true,
			maxHeight: desiredMax
		};
	}
}