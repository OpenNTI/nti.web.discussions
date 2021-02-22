import { User as UserClient } from '@nti/web-client';
import { User } from '@nti/web-commons';

const { useUser } = User;

export default function resolveEntities(entities = []) {
	return Promise.all(
		entities.map(e =>
			UserClient.resolve({ entity: e }).catch(() =>
				useUser.getAnonymous(e)
			)
		)
	);
}
