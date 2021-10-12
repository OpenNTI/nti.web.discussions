const TagAttributes =
	'data-nti-entity-id="tagging-strategy-#-TAG-Tags" data-nti-entity-mutability="MUTABLE" data-nti-entity-type="TAG"';
const MentionAttributes =
	'data-nti-entity-id="tagging-strategy-@-MENTION-Mentions" data-nti-entity-mutability="IMMUTABLE" data-nti-entity-type="MENTION" ';

const usernameFromMention = mention =>
	(mention?.User ?? mention?.Entity)?.getID?.();
const displayFromMention = mention =>
	(mention?.User ?? mention?.Entity)?.displayName;

//Creates a safe html document that we can manipulate without affecting the
//current page document
function getSafeBody(html) {
	try {
		const doc =
			document?.implementation?.createHTMLDocument?.('scratchpad');
		doc.documentElement.innerHTML = html;

		return doc.getElementsByTagName('body')[0];
	} catch (e) {
		return null;
	}
}

function getMentionsAndTags(body) {
	if (!Array.isArray(body)) {
		body = [body];
	}

	return body.reduce(
		(acc, part) => {
			if (typeof part !== 'string') {
				return acc;
			}

			const frag = getSafeBody(body);

			const mentions = Array.from(
				frag.querySelectorAll('a[data-nti-entity-type=MENTION]')
			);
			const tags = Array.from(
				frag.querySelectorAll('a[data-nti-entity-type=TAG]')
			);

			return {
				mentions: [
					...acc.mentions,
					...mentions.map(a =>
						a.getAttribute('data-nti-entity-username')
					),
				],
				tags: [
					...acc.tags,
					...tags.map(a => a.textContent.replace(/^#/, '')),
				],
			};
		},
		{ mentions: [], tags: [] }
	);
}

function getLegacyTagsPart(tags) {
	let part = '<html><body><p>';

	for (let tag of tags) {
		part += `<a ${TagAttributes}>#${tag}</a> `;
	}

	return `${part}</p></body></html>`;
}

function getLegacyMentionsPart(mentions) {
	let part = '<html><body><p>';

	for (let mention of mentions) {
		part += `<a ${MentionAttributes} data-nti-entity-username="${usernameFromMention(
			mention
		)}">${displayFromMention(mention)}</a>`;
	}

	return `${part}</p></body></html>`;
}

function addLegacy(body, tags, mentions) {
	const legacy = Array.isArray(body) ? [...body] : [body];

	if (mentions.length > 0) {
		legacy.push(getLegacyMentionsPart(mentions));
	}

	if (tags.length > 0) {
		legacy.push(getLegacyTagsPart(tags));
	}

	return legacy;
}

export default function getLegacyBody(discussion) {
	const body = discussion.getBody();
	const tags = discussion.getTags() ?? [];
	const mentions = discussion.getMentions() ?? [];

	const existing = getMentionsAndTags(body);

	return addLegacy(
		body,
		tags.filter(x => existing.tags.indexOf(x) === -1),
		mentions.filter(mention => {
			const username = usernameFromMention(mention);

			return existing.mentions.indexOf(username) === -1;
		})
	);
}
