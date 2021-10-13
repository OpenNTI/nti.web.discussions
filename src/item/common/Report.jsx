import PropTypes from 'prop-types';

import { Launch } from '@nti/web-reports';

DiscussionItemReport.propTypes = {
	post: PropTypes.shape({
		getReport: PropTypes.func,
	}),
};
export default function DiscussionItemReport({ post, ...otherProps }) {
	const report = post && post.getReport && post.getReport();

	return <Launch.Button report={report} {...otherProps} />;
}
