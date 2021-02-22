/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';

import ForumBin from '../ForumBin';

describe('Forum Bin', () => {
	test('Snapshot', () => {
		const bin = {
			Section: {
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
						hasLink: () => true,
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
						hasLink: () => true,
						Links: [],
					},
				],
			},
			Parent: {
				forums: [
					{
						NTIID:
							'tag:nextthought.com,2011-10:unknown-OID-0x05513f:5573657273:ZkMpTMuJZj8',
						MimeType:
							'application/vnd.nextthought.forums.communityforum',
						TopicCount: 2,
						title: 'Parent One',
						edit: () => {},
						hasLink: () => true,
						getID: () =>
							'tag:nextthought.com,2011-10:unknown-OID-0x05513f:5573657273:ZkMpTMuJZj8',
						Links: [],
					},
					{
						NTIID:
							'tag:nextthought.com,2011-10:unknown-OID-0x055199:5573657273:ZkMpTMuJZhn',
						MimeType:
							'application/vnd.nextthought.forums.communityforum',
						TopicCount: 0,
						title: 'Parent Two',
						edit: () => {},
						hasLink: () => true,
						getID: () =>
							'tag:nextthought.com,2011-10:unknown-OID-0x055199:5573657273:ZkMpTMuJZhn',
						Links: [],
					},
				],
			},
		};
		const tree = renderer.create(<ForumBin title="" bin={bin} />).toJSON();
		expect(tree).toMatchSnapshot();
	});
});
