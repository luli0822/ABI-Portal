import React from 'react';
import PropTypes from 'prop-types';
import jump from 'jump.js';
import globals from '../../globals';

/**
 * Provides all-in-one link functionality
 * Button option is provided to allow button to scroll interactive content into view
 * Why not use react-scroll? Because it doesn't manage focus so it's not keyboard accessible.
 * @param {*} props
 */
function ScrollLink(props) {
	const {
		children,
		href,
		button,
		onClick,
		className,
		metricsData,
		offset,
		id,
		dataCruller,
	} = props;

	/**
	 * TODO: determine if this functionality is needed in starter kit
	 * Returns an object with data-metrics-* attributes
	 * Used with the MetricsElement component from react-metrics
	 */
	function buildMetricsProps() {
		if (typeof metricsData !== 'object') return {};

		const metricsProps = {
			'data-metrics-event-name': 'click',
			...Object.assign(
				{},
				...Object.keys(metricsData).map(key => ({ [`data-metrics-${key}`]: metricsData[key] }))
			),
		};

		return metricsProps;
	}

	// wrap Jump in a promise
	function doJump(element, jumpOffset) {
		return new Promise(resolve =>
			jump(element, {
				offset: jumpOffset,
				callback: resolve,
			})
		);
	}

	// do an in-page smooth scroll
	async function doInPageScroll() {
		const targetId = href.split('#')[1];
		// eslint-disable-next-line no-undef
		const element = globals.getElementById(targetId);

		// set the jump offset to 0 by default
		let jumpOffset = 0;

		// If offset prop is a number, then set jump offset to the number value
		if (typeof offset === 'number') {
			jumpOffset = offset;
		}

		// if offset is a string (id of offset element), then
		// set jump offset to the be the height of the element
		if (typeof offset === 'string') {
			jumpOffset = -globals.getElementById(`${offset}`).offsetHeight;
		}
		// only scroll if we have a valid target element (no error for misspelled targets)
		if (!element) return;

		await doJump(element, jumpOffset);

		// we have to asssign a tabindex to ensure the target gets focus like a regular link would
		// saving the original so we can assign it back
		const originalTabIndex = element.getAttribute('tabindex');
		// do the tabindex stuff to ensure focus is applied appropriately
		// TODO: is there a way to test this?
		element.setAttribute('tabindex', '-1');
		element.focus();
		element.setAttribute('tabindex', originalTabIndex);
	}

	async function clickHandler(e) {
		// only do in-page navigation if the event is click or enter,
		// mirroring native link functionality
		const isNavigationEvent =
			e.type === 'click' || (e.type === 'keydown' && e.key === (button ? 'Space' : 'Enter'));
		const isValidHref = href && href.indexOf('#') === 0;

		if (!(isNavigationEvent && isValidHref)) {
			return;
		}

		e.preventDefault();

		if (!button) {
			globals.getWindow().history.pushState(null, null, href);
		}
		await doInPageScroll();

		if (typeof onClick === 'function') {
			onClick();
		}
	}

	const metricsProps = buildMetricsProps();

	const Tag = button ? 'button' : 'a';

	return (
		<Tag
			onClick={clickHandler}
			href={href}
			className={className}
			id={id}
			data-cruller={dataCruller}
			// eslint-disable-next-line react/jsx-props-no-spreading
			{...metricsProps}
		>
			{children}
		</Tag>
	);
}

ScrollLink.propTypes = {
	/** the child elements to be rendered in the <a> or <button> */
	children: PropTypes.node.isRequired,
	/** the target href for <a> tags, or where the screen should focus after <button> click */
	href: PropTypes.string.isRequired,
	/** Should this render a button.
	 * This is provided specifically so buttons that toggle content can scroll that content into view.
	 */
	button: PropTypes.bool,
	/** onClick handler that runs after scroll/focus */
	onClick: PropTypes.func,
	/** the className to be applied to the <a> or <button> */
	className: PropTypes.string,
	// eslint disabled because we don't know what the keys will be so we can't provide shape
	// eslint-disable-next-line react/forbid-prop-types
	metricsData: PropTypes.object,
	/** the element unique id that can be used to identify and perform tasks
	 *  on the the element */
	id: PropTypes.string,
	// The jump offset. It can be a string representing the element id we want to set it's
	// height as an offset (ex: fixed header height) , or offset number
	offset: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	// data-cruller attribute to add any values to reference and use for cruller testing
	dataCruller: PropTypes.string,
};

ScrollLink.defaultProps = {
	button: false,
	onClick: () => {},
	className: '',
	metricsData: undefined,
	offset: undefined,
	id: undefined,
	dataCruller: undefined,
};

export default ScrollLink;
