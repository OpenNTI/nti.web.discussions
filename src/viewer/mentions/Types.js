import {isNTIID} from '@nti/lib-ntiids';

const Group = 'group';
const User = 'user';

const getTypeForID = id => isNTIID(id) ? Group : User; 

export function getType (mention) {
	if (typeof mention === 'string') { return getTypeForID(mention); }

	const user = mention?.User ?? mention;

	return user.isUser ? User : Group;
}

export const isGroup = m => getType(m) === Group;
export const isUser = m => getType(m) === User;