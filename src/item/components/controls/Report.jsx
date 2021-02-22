import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import { scoped } from '@nti/lib-locale';
import { Text, Prompt } from '@nti/web-commons';

import Styles from './Styles.css';

const cx = classnames.bind(Styles);
const t = scoped('nti-web-discussions.item.components.controls.Report', {
	report: 'Report',
	confirm: {
		title: 'Are you sure?',
		message: 'Reporting content as inappropriate can not be undone.',
	},
	failed: {
		title: 'Error',
		message: 'Unable to report post.',
	},
});

DiscussionItemReport.isAvailable = item => item.isFlaggable;
DiscussionItemReport.propTypes = {
	item: PropTypes.shape({
		isFlaggable: PropTypes.bool,
		isFlagged: PropTypes.bool,
		flag: PropTypes.func,
	}),
	doClose: PropTypes.func,
};
export default function DiscussionItemReport({ item, doClose }) {
	const [reporting, setReporting] = React.useState(false);
	const onClick = async e => {
		e.preventDefault();
		e.stopPropagation();

		setReporting(true);

		try {
			await Prompt.areYouSure(t('confirm.message'), t('confirm.title'));

			doClose();

			await item.flag();
		} catch (err) {
			if (err !== 'Prompt Canceled') {
				Prompt.alert(t('failed.message'), t('failed.title'));
			}

			doClose();
		}
	};

	return (
		<Text.Base
			as="a"
			role="button"
			className={cx('action', { busy: reporting })}
			onClick={onClick}
		>
			{t('report')}
		</Text.Base>
	);
}
