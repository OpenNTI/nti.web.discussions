import Registry from './Registry';
import Unknown from './Unknown';

import './Image';
import './Page';
import './RealPageNumber';
import './Slide';
import './Video';
import './Poll';
import './RelatedWorkRef';

export default function getType (item) {
	try {
		return (item && Registry.getInstance().getItemFor(item.MimeType || item.type)) || Unknown;
	}
	catch(e) {
		//eslint-disable-next-line
		console.error(e.stack || e.message || e);
	}
	return Unknown;
}
