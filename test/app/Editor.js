import React from 'react';
import {Prompt} from '@nti/web-commons';

import {Editor} from '../../src';

export default function EditorTest () {
	return (
		<Prompt.Dialog>
			<Editor dialog />
		</Prompt.Dialog>
	);
}