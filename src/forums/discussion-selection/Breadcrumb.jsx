import { useCallback } from 'react';
import PropTypes from 'prop-types';

const Container = styled.div`
	margin-bottom: 30px;
	padding-top: 10px;
`;

const Separator = styled('span').attrs(props => ({ children: '/', ...props }))`
	margin-right: 3px;
	font: normal 600 0.75em/1 var(--body-font-family);
`;

const Breadcrumb = styled('span')`
	font: normal 600 0.75em/1 var(--body-font-family);
	color: var(--primary-blue);
	margin-right: 5px;
	cursor: pointer;

	&.inactive {
		cursor: auto;
		color: black;
	}
`;

Part.propTypes = {
	inactive: PropTypes.bool,
	item: PropTypes.object,
	onClick: PropTypes.func,
};

function Part({ inactive, onClick, item }) {
	const handleClick = useCallback(() => !inactive && onClick?.(item), [
		inactive,
		item,
		onClick,
	]);
	return (
		<Breadcrumb
			data-testid="discussion-selection-breadcrumb"
			onClick={handleClick}
			inactive={inactive}
		>
			{item.title}
		</Breadcrumb>
	);
}

Breadcrumbs.propTypes = {
	breadcrumb: PropTypes.arrayOf(PropTypes.object),
	onClick: PropTypes.func,
};

/**
 * @param root0
 * @param root0.breadcrumb
 * @param root0.onClick
 * @deprecated This code is retained for legacy content-backed discussions.
 */
export default function Breadcrumbs({ breadcrumb, onClick }) {
	if (!breadcrumb?.length) {
		return <div />;
	}

	const getKey = i => `${i.step}--${i.title}`;
	const components = [];

	// don't worry about rendering hidden breadcrumbs.. those only exist
	// for accurate step tracking in the container
	const filteredBreadcrumbs = breadcrumb.filter(bc => {
		return !bc.isHidden;
	});

	for (let i = 0; i < filteredBreadcrumbs.length - 1; i++) {
		const item = filteredBreadcrumbs[i];
		components.push(
			<Part key={getKey(item)} item={item} onClick={onClick} />
		);
		components.push(
			<Separator
				key={i + '--separator'}
				data-testid="discussion-selection-breadcrumb-separator"
			/>
		);
	}

	const lastItem = filteredBreadcrumbs[filteredBreadcrumbs.length - 1];

	components.push(
		<Part
			key={getKey(lastItem)}
			item={lastItem}
			onClick={onClick}
			inactive
		/>
	);

	return (
		<Container data-testid="discussion-selection-breadcrumb-container">
			{components}
		</Container>
	);
}
