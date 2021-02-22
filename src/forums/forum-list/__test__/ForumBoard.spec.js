/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';

import ForumBoard from '../ForumBoard';

describe('Forum Board', () => {
	test('General Snapshot', async () => {
		const board = {
			forums: [
				{
					MimeType:
						'application/vnd.nextthought.forums.communityforum',
					NTIID:
						'tag:nextthought.com,2011-10:unknown-OID-0x0551b0:5573657273:ZkMpTMuJZhf',
					TopicCount: 0,
					title: 'One',
					getID: () =>
						'tag:nextthought.com,2011-10:unknown-OID-0x0551b0:5573657273:ZkMpTMuJZhf',
					edit: () => {},
					hasLink: () => false,
					Links: [],
				},
				{
					MimeType:
						'application/vnd.nextthought.forums.communityforum',
					NTIID:
						'tag:nextthought.com,2011-10:unknown-OID-0x0551b8:5573657273:ZkMpTMuJZhe',
					TopicCount: 0,
					title: 'Two',
					getID: () =>
						'tag:nextthought.com,2011-10:unknown-OID-0x0551b8:5573657273:ZkMpTMuJZhe',
					edit: () => {},
					hasLink: () => false,
					Links: [],
				},
			],
		};
		const tree = renderer
			.create(<ForumBoard title="Section" board={board} />)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
