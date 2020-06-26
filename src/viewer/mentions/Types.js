import {isNTIID} from '@nti/lib-ntiids';

const Group = 'group';
const User = 'user';

const getTypeForID = id => isNTIID(id) ? Group : User; 

export function getEntity (mention) {
	return mention?.User ?? mention?.Entity ?? mention;
}

export function getType (mention) {
	const user = getEntity(mention);
	
	if (typeof user === 'string') { return getTypeForID(mention); }

	return user.isUser ? User : Group;
}

export const isGroup = m => getType(m) === Group;
export const isUser = m => getType(m) === User;