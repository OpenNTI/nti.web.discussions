import {Registry} from '@nti/lib-commons';

export default class ContextTypeRegistry extends Registry.Map {
	getItemFor (str) {
		str = str.split(' ')[0];
		return super.getItemFor(str);
	}
}
