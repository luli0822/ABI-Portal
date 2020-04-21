import Router from 'next/router';

// Mock Next/Link router for storybook.
Router.router = { 
	pageLoader: {
		prefetched: {}
	},
	push: () => {}, 
	prefetch: () => {} 
}