import { useState, useEffect } from 'react';

// hook that uses intersection observer
export default function useOnScreen(ref, rootMargin = '0px') {
	const [isIntersecting, setIsIntersecting] = useState(false);

	useEffect(() => {
		// fallback to just load everything if IntersectionObserver is not available
		if (
			!('IntersectionObserver' in window) ||
			!('IntersectionObserverEntry' in window) ||
			!('isIntersecting' in window.IntersectionObserverEntry.prototype)
		) {
			setIsIntersecting(true);
			return () => {};
		}

		const element = ref.current;
		const observer = new IntersectionObserver(
			([entry]) => {
				setIsIntersecting(entry.isIntersecting);
			},
			{ rootMargin }
		);
		if (ref.current) {
			observer.observe(element);
		}
		return () => {
			observer.unobserve(element);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []); // empty array because we only want to run on mount/unmount

	return isIntersecting;
}
