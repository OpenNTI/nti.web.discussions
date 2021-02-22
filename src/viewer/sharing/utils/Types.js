import { isNTIID } from '@nti/lib-ntiids';

const Group = 'group';
const User = 'user';
const Anonymous = 'anonymous';

const getTypeForID = id => (isNTIID(id) ? Group : User);

export function getIdForEntity(entity) {
	if (typeof entity === 'string') {
		return entity;
	}

	return entity.isUser ? entity.getID() : entity.NTIID;
}

export function getEntity(mention) {
	return mention?.User ?? mention?.Entity ?? mention;
}

export function getType(mention) {
	const user = getEntity(mention);

	if (typeof user === 'string') {
		return getTypeForID(mention);
	}
	if (user.anonymous) {
		return Anonymous;
	}

	return user.isUser ? User : Group;
}

export const isGroup = m => getType(m) === Group;
export const isUser = m => getType(m) === User;
export const isAnonymous = m => getType(m) === Anonymous;
