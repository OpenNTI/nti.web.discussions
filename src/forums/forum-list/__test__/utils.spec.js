/* eslint-env jest */

import { getFirstForum, binDiscussions } from '../utils';

const getBin = function () {
	const openBin = RegExp.prototype.test.bind(/open/i);
	const forCreditBin = RegExp.prototype.test.bind(/in-class/i);

	const title = this.title || '';

	return openBin(title)
		? 'Open'
		: forCreditBin(title)
		? 'ForCredit'
		: 'Other';
};

describe('Forum List Utils', () => {
	test('Simple Case - Only My Section', () => {
		const section = {
			Items: [
				{
					NTIID:
						'tag:nextthought.com,2011-10:unknown-OID-0x064e71e9:5573657273:RahzfPJkpHT',
					MimeType:
						'application/vnd.nextthought.forums.communityforum',
					href:
						'/dataserver2/++etc++hostsites/alpha.nextthought.com/++etc++site/Courses/DefaultAPICreated/forums/Discussions/Test_1',
					TopicCount: 0,
					title: 'Test 1',
					getBin,
				},
				{
					NTIID:
						'tag:nextthought.com,2011-10:unknown-OID-0x064e654c:5573657273:shBJBtESTz9',
					MimeType:
						'application/vnd.nextthought.forums.communityforum',
					href:
						'/dataserver2/++etc++hostsites/alpha.nextthought.com/++etc++site/Courses/DefaultAPICreated/forums/Discussions/Test_2',
					TopicCount: 0,
					title: 'Test 2',
					getBin,
				},
				{
					NTIID:
						'tag:nextthought.com,2011-10:unknown-OID-0x064e72d2:5573657273:RahzfPJkpHS',
					MimeType:
						'application/vnd.nextthought.forums.communityforum',
					href:
						'/dataserver2/++etc++hostsites/alpha.nextthought.com/++etc++site/Courses/DefaultAPICreated/forums/Discussions/Test_3',
					TopicCount: 0,
					title: 'Test 3',
					getBin,
				},
				{
					NTIID:
						'tag:nextthought.com,2011-10:unknown-OID-0x064e7305:5573657273:gADdrrw4dp',
					MimeType:
						'application/vnd.nextthought.forums.communityforum',
					href:
						'/dataserver2/++etc++hostsites/alpha.nextthought.com/++etc++site/Courses/DefaultAPICreated/forums/Discussions/Test_4',
					TopicCount: 0,
					title: 'Test 4',
					getBin,
				},
				{
					NTIID:
						'tag:nextthought.com,2011-10:unknown-OID-0x064e7385:5573657273:RahzfPJkpHR',
					MimeType:
						'application/vnd.nextthought.forums.communityforum',
					href:
						'/dataserver2/++etc++hostsites/alpha.nextthought.com/++etc++site/Courses/DefaultAPICreated/forums/Discussions/Test_5',
					TopicCount: 0,
					title: 'Test 5',
					getBin,
				},
			],
		};

		const bins = binDiscussions(section);
		const firstForum = getFirstForum(bins);
		expect(firstForum.NTIID).toEqual(
			'tag:nextthought.com,2011-10:unknown-OID-0x064e71e9:5573657273:RahzfPJkpHT'
		);
	});

	test('Open should be first', () => {
		const section = {
			Items: [
				{
					NTIID:
						'tag:nextthought.com,2011-10:unknown-OID-0x064e71e9:5573657273:RahzfPJkpHT',
					MimeType:
						'application/vnd.nextthought.forums.communityforum',
					href:
						'/dataserver2/++etc++hostsites/alpha.nextthought.com/++etc++site/Courses/DefaultAPICreated/forums/Discussions/Test_1',
					TopicCount: 0,
					title: 'Test 1',
					getBin,
				},
				{
					NTIID:
						'tag:nextthought.com,2011-10:unknown-OID-0x064e654c:5573657273:shBJBtESTz9',
					MimeType:
						'application/vnd.nextthought.forums.communityforum',
					href:
						'/dataserver2/++etc++hostsites/alpha.nextthought.com/++etc++site/Courses/DefaultAPICreated/forums/Discussions/Test_2',
					TopicCount: 0,
					title: 'Test 2',
					getBin,
				},
				{
					NTIID:
						'tag:nextthought.com,2011-10:unknown-OID-0x064e72d2:5573657273:RahzfPJkpHS',
					MimeType:
						'application/vnd.nextthought.forums.communityforum',
					href:
						'/dataserver2/++etc++hostsites/alpha.nextthought.com/++etc++site/Courses/DefaultAPICreated/forums/Discussions/Test_3',
					TopicCount: 0,
					title: 'Open Test 3',
					getBin,
				},
			],
		};

		const bins = binDiscussions(section);
		const firstForum = getFirstForum(bins);
		expect(firstForum.NTIID).toEqual(
			'tag:nextthought.com,2011-10:unknown-OID-0x064e72d2:5573657273:RahzfPJkpHS'
		);
	});

	test('In-Class should be first', () => {
		const section = {
			Items: [
				{
					NTIID:
						'tag:nextthought.com,2011-10:unknown-OID-0x064e71e9:5573657273:RahzfPJkpHT',
					MimeType:
						'application/vnd.nextthought.forums.communityforum',
					href:
						'/dataserver2/++etc++hostsites/alpha.nextthought.com/++etc++site/Courses/DefaultAPICreated/forums/Discussions/Test_1',
					TopicCount: 0,
					title: 'Test 1',
					getBin,
				},
				{
					NTIID:
						'tag:nextthought.com,2011-10:unknown-OID-0x064e654c:5573657273:shBJBtESTz9',
					MimeType:
						'application/vnd.nextthought.forums.communityforum',
					href:
						'/dataserver2/++etc++hostsites/alpha.nextthought.com/++etc++site/Courses/DefaultAPICreated/forums/Discussions/Test_2',
					TopicCount: 0,
					title: 'Open Test 2',
					getBin,
				},
				{
					NTIID:
						'tag:nextthought.com,2011-10:unknown-OID-0x064e72d2:5573657273:RahzfPJkpHS',
					MimeType:
						'application/vnd.nextthought.forums.communityforum',
					href:
						'/dataserver2/++etc++hostsites/alpha.nextthought.com/++etc++site/Courses/DefaultAPICreated/forums/Discussions/Test_3',
					TopicCount: 0,
					title: 'In-Class Test 3',
					getBin,
				},
				{
					NTIID:
						'tag:nextthought.com,2011-10:unknown-OID-0x064e7305:5573657273:gADdrrw4dp',
					MimeType:
						'application/vnd.nextthought.forums.communityforum',
					href:
						'/dataserver2/++etc++hostsites/alpha.nextthought.com/++etc++site/Courses/DefaultAPICreated/forums/Discussions/Test_4',
					TopicCount: 0,
					title: 'In-Class Test 4',
					getBin,
				},
			],
		};

		const bins = binDiscussions(section);
		const firstForum = getFirstForum(bins);
		expect(firstForum.NTIID).toEqual(
			'tag:nextthought.com,2011-10:unknown-OID-0x064e72d2:5573657273:RahzfPJkpHS'
		);
	});

	test('Simple Case - My Section & Parent', () => {
		const section = {
			Items: [
				{
					NTIID:
						'tag:nextthought.com,2011-10:unknown-OID-0x064e654c:5573657273:shBJBtESTz9',
					MimeType:
						'application/vnd.nextthought.forums.communityforum',
					href:
						'/dataserver2/++etc++hostsites/alpha.nextthought.com/++etc++site/Courses/DefaultAPICreated/forums/Discussions/Test_2',
					TopicCount: 0,
					title: 'Test 2',
					getBin,
				},
				{
					NTIID:
						'tag:nextthought.com,2011-10:unknown-OID-0x064e71e9:5573657273:RahzfPJkpHT',
					MimeType:
						'application/vnd.nextthought.forums.communityforum',
					href:
						'/dataserver2/++etc++hostsites/alpha.nextthought.com/++etc++site/Courses/DefaultAPICreated/forums/Discussions/Test_1',
					TopicCount: 0,
					title: 'Test 1',
					getBin,
				},
				{
					NTIID:
						'tag:nextthought.com,2011-10:unknown-OID-0x064e72d2:5573657273:RahzfPJkpHS',
					MimeType:
						'application/vnd.nextthought.forums.communityforum',
					href:
						'/dataserver2/++etc++hostsites/alpha.nextthought.com/++etc++site/Courses/DefaultAPICreated/forums/Discussions/Test_3',
					TopicCount: 0,
					title: 'Test 3',
					getBin,
				},
			],
		};

		const parent = {
			Items: [
				{
					NTIID:
						'tag:nextthought.com,2011-10:unknown-OID-0x064e7305:5573657273:gADdrrw4dp',
					MimeType:
						'application/vnd.nextthought.forums.communityforum',
					href:
						'/dataserver2/++etc++hostsites/alpha.nextthought.com/++etc++site/Courses/DefaultAPICreated/forums/Discussions/Test_4',
					TopicCount: 0,
					title: 'Test 4',
					getBin,
				},
				{
					NTIID:
						'tag:nextthought.com,2011-10:unknown-OID-0x064e7385:5573657273:RahzfPJkpHR',
					MimeType:
						'application/vnd.nextthought.forums.communityforum',
					href:
						'/dataserver2/++etc++hostsites/alpha.nextthought.com/++etc++site/Courses/DefaultAPICreated/forums/Discussions/Test_5',
					TopicCount: 0,
					title: 'Test 5',
					getBin,
				},
			],
		};

		const bins = binDiscussions(section, parent);
		const firstForum = getFirstForum(bins);
		expect(firstForum.NTIID).toEqual(
			'tag:nextthought.com,2011-10:unknown-OID-0x064e654c:5573657273:shBJBtESTz9'
		);
	});

	test('Simple Case - Only Parent', () => {
		const section = {
			Items: [],
		};
		const parent = {
			Items: [
				{
					NTIID:
						'tag:nextthought.com,2011-10:unknown-OID-0x064e7305:5573657273:gADdrrw4dp',
					MimeType:
						'application/vnd.nextthought.forums.communityforum',
					href:
						'/dataserver2/++etc++hostsites/alpha.nextthought.com/++etc++site/Courses/DefaultAPICreated/forums/Discussions/Test_4',
					TopicCount: 0,
					title: 'Test 4',
					getBin,
				},
				{
					NTIID:
						'tag:nextthought.com,2011-10:unknown-OID-0x064e7385:5573657273:RahzfPJkpHR',
					MimeType:
						'application/vnd.nextthought.forums.communityforum',
					href:
						'/dataserver2/++etc++hostsites/alpha.nextthought.com/++etc++site/Courses/DefaultAPICreated/forums/Discussions/Test_5',
					TopicCount: 0,
					title: 'Test 5',
					getBin,
				},
			],
		};

		const bins = binDiscussions(section, parent);
		const firstForum = getFirstForum(bins);
		expect(firstForum.NTIID).toEqual(
			'tag:nextthought.com,2011-10:unknown-OID-0x064e7305:5573657273:gADdrrw4dp'
		);
	});

	test('Open Parent', () => {
		const section = {
			Items: [],
		};
		const parent = {
			Items: [
				{
					NTIID:
						'tag:nextthought.com,2011-10:unknown-OID-0x064e7305:5573657273:gADdrrw4dp',
					MimeType:
						'application/vnd.nextthought.forums.communityforum',
					href:
						'/dataserver2/++etc++hostsites/alpha.nextthought.com/++etc++site/Courses/DefaultAPICreated/forums/Discussions/Test_4',
					TopicCount: 0,
					title: 'Test 4',
					getBin,
				},
				{
					NTIID:
						'tag:nextthought.com,2011-10:unknown-OID-0x064e7385:5573657273:RahzfPJkpHR',
					MimeType:
						'application/vnd.nextthought.forums.communityforum',
					href:
						'/dataserver2/++etc++hostsites/alpha.nextthought.com/++etc++site/Courses/DefaultAPICreated/forums/Discussions/Test_5',
					TopicCount: 0,
					title: 'Open Test 5',
					getBin,
				},
			],
		};

		const bins = binDiscussions(section, parent);
		const firstForum = getFirstForum(bins);
		expect(firstForum.NTIID).toEqual(
			'tag:nextthought.com,2011-10:unknown-OID-0x064e7385:5573657273:RahzfPJkpHR'
		);
	});

	test('In-Class Parent', () => {
		const section = {
			Items: [],
		};
		const parent = {
			Items: [
				{
					NTIID:
						'tag:nextthought.com,2011-10:unknown-OID-0x064e71e9:5573657273:RahzfPJkpHT',
					MimeType:
						'application/vnd.nextthought.forums.communityforum',
					href:
						'/dataserver2/++etc++hostsites/alpha.nextthought.com/++etc++site/Courses/DefaultAPICreated/forums/Discussions/Test_1',
					TopicCount: 0,
					title: 'Test 1',
					getBin,
				},
				{
					NTIID:
						'tag:nextthought.com,2011-10:unknown-OID-0x064e654c:5573657273:shBJBtESTz9',
					MimeType:
						'application/vnd.nextthought.forums.communityforum',
					href:
						'/dataserver2/++etc++hostsites/alpha.nextthought.com/++etc++site/Courses/DefaultAPICreated/forums/Discussions/Test_2',
					TopicCount: 0,
					title: 'Open Test 2',
					getBin,
				},
				{
					NTIID:
						'tag:nextthought.com,2011-10:unknown-OID-0x064e72d2:5573657273:RahzfPJkpHS',
					MimeType:
						'application/vnd.nextthought.forums.communityforum',
					href:
						'/dataserver2/++etc++hostsites/alpha.nextthought.com/++etc++site/Courses/DefaultAPICreated/forums/Discussions/Test_3',
					TopicCount: 0,
					title: 'In-Class Test 3',
					getBin,
				},
				{
					NTIID:
						'tag:nextthought.com,2011-10:unknown-OID-0x064e7305:5573657273:gADdrrw4dp',
					MimeType:
						'application/vnd.nextthought.forums.communityforum',
					href:
						'/dataserver2/++etc++hostsites/alpha.nextthought.com/++etc++site/Courses/DefaultAPICreated/forums/Discussions/Test_4',
					TopicCount: 0,
					title: 'In-Class Test 4',
					getBin,
				},
			],
		};

		const bins = binDiscussions(section, parent);
		const firstForum = getFirstForum(bins);
		expect(firstForum.NTIID).toEqual(
			'tag:nextthought.com,2011-10:unknown-OID-0x064e72d2:5573657273:RahzfPJkpHS'
		);
	});
});
