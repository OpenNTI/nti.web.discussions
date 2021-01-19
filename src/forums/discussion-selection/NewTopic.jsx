import React from 'react';
import {Text} from '@nti/web-commons';
import { scoped } from '@nti/lib-locale';

import {Container as BaseContainer} from './Topic';

const t = scoped('nti.web.discussion-selection.NewTopic', {
	label: 'Start a new discussion\nin this channel'
});

const Container = styled(BaseContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 14px;
`;

const Label = styled(Text.Translator(t).Base)`
	color: var(--secondary-grey);
	font-size: 0.875rem;
	font-style: italic;
	max-width: 180px;
	text-align: center;
`;

const Icon = styled.div`
	color: var(--border-grey-alt);
	border: 1px solid var(--border-grey-alt);
	border-radius: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	--size: 51px;

	height: var(--size);
	width: var(--size);

	& > i {
		transform: translate(0.5px, 0);
	}
`;

const Glyph = styled('i').attrs({className: 'icon-discuss'})`
	font-size: 24px;
	color: var(--secondary-grey);
`;

export default function NewTopic (props) {
	return (
		<Container>
			<Icon>
				<Glyph/>
			</Icon>
			<Label localeKey="label"/>
		</Container>
	);
}
