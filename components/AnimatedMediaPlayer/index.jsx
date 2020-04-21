import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlayButton from './PlayButton';
import './style.scss';

function AnimatedMediaPlayer(props) {
	const { mp4Url, posterUrl, autoplay, description } = props;
	const rootClass = 'animated-media-player';
	const videoRef = useRef(null);

	// values for isPlaying include 'autoplay', 'hover', 'click', and 'keyDown'
	// to determine what started the video
	const [isPlaying, setIsPlaying] = useState(autoplay ? 'autoplay' : false);

	// controls whether the video should play again when the first autoplay ends
	const [autoPlaysRemaining, setAutoPlaysRemaining] = useState(autoplay - 1);

	useEffect(() => {
		if (autoplay) {
			const videoElement = videoRef.current;
			// don't use the play() function because that sets loop = true, but autoplay shouldn't loop
			videoElement.play();
			// we don't need to set isPlaying because it's already set to 'autoplay' above
		}
	}, [autoplay]);

	/**
	 * Start playing the video. If loop==true, set the video to continually loop
	 * @param {string} trigger
	 * @param {boolean} loop
	 */
	function play(trigger, loop) {
		const videoElement = videoRef.current;
		if (videoElement.paused) {
			// only start the video and set the trigger if it's not already playing
			videoElement.play();
			videoElement.loop = loop;
			setIsPlaying(trigger);
		}
	}

	function pause() {
		const videoElement = videoRef.current;
		videoElement.pause();
		setIsPlaying(false);
	}

	function togglePlay(trigger) {
		const videoElement = videoRef.current;
		if (videoElement.paused) {
			play(trigger, true);
		} else {
			pause();
		}
	}

	function clickHandler() {
		togglePlay('click');
	}

	function keyDownHandler(event) {
		if (event.key === 'Enter') {
			togglePlay('keyDown');
		}
	}

	function mouseOverHandler() {
		play('hover', true);
	}

	function mouseOutHandler() {
		// only pause the video if the trigger was mouse-over
		if (isPlaying === 'hover') {
			pause();
		}
	}

	function endedHandler() {
		setIsPlaying(false);
		if (autoPlaysRemaining > 0) {
			setAutoPlaysRemaining(autoPlaysRemaining - 1);
			play('autoplay');
		}
	}

	return (
		<div className={rootClass}>
			<div className={`${rootClass}__overlay ${isPlaying ? `${rootClass}__overlay--hidden` : ''}`}>
				<PlayButton />
			</div>
			{/* eslint-disable-next-line jsx-a11y/mouse-events-have-key-events */}
			<video
				muted
				poster={posterUrl}
				className={`${rootClass}__video`}
				tabIndex={0}
				ref={videoRef}
				onClick={clickHandler}
				onKeyDown={keyDownHandler}
				onMouseOver={mouseOverHandler}
				onMouseOut={mouseOutHandler}
				onEnded={endedHandler}
				aria-label={description}
			>
				<source src={mp4Url} type="video/mp4" />
			</video>
		</div>
	);
}

AnimatedMediaPlayer.propTypes = {
	mp4Url: PropTypes.string.isRequired,
	posterUrl: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	autoplay: PropTypes.number,
};

AnimatedMediaPlayer.defaultProps = {
	autoplay: 0,
};

export default AnimatedMediaPlayer;
