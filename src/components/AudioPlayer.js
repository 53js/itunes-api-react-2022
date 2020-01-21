import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import './AudioPlayer.scss';

const AudioPlayer = ({ track }) => {
	const audioRef = useRef(null);

	// useEffect(() => {
	// 	if (track && track.previewUrl) {
	// 		audioRef.current.play();
	// 	}
	// }, [track]);
	return (
		<audio
			className="AudioPlayer"
			controls
			autoPlay
			src={track && track.previewUrl}
			ref={audioRef}
		>
			Your browser does not support the
			<code>audio</code> element.
		</audio>
	);
};

AudioPlayer.propTypes = {
	track: PropTypes.shape({
		previewUrl: PropTypes.string.isRequired,
	}),
};

AudioPlayer.defaultProps = {
	track: null,
};

export default AudioPlayer;
