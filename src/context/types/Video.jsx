import React from 'react';
import PropTypes from 'prop-types';
import Video from '@nti/web-video';
import { Loading } from '@nti/web-commons';

import Registry from './Registry';

export default
@Registry.register('application/vnd.nextthought.ntivideo')
@Registry.register('application/vnd.nextthought.ntivideoref')
class VideoContext extends React.Component {
	static propTypes = {
		item: PropTypes.object
	}

	state = {
		video: null,
		loading: true
	}

	componentDidMount () {
		this.refresh();
	}

	componentDidUpdate (prevProps) {
		if (prevProps.item.getID() !== this.props.item.getID()) {
			this.refresh();
		}
	}

	shouldComponentUpdate (nextProps, nextState) {
		if (nextProps.item.getID() === this.props.item.getID() && this.state.video !== this.state.video) {
			return false;
		}
		return true;
	}

	refresh = async () => {
		const video = await this.props.item.refresh();

		this.setState({ video, loading: false });
	}

	render () {
		const { video, loading } = this.state;

		return (
			<div className="discussion-context-video">
				{!video && loading && <Loading.Mask />}
				{video && <Video src={video} />}
			</div>
		);
	}
}
