import PropTypes from 'prop-types';
import { fallbackLang } from './config';

export const assetPropType = PropTypes.shape({
	fields: PropTypes.shape({
		file: PropTypes.shape({
			[fallbackLang]: PropTypes.shape({
				url: PropTypes.string,
				fileName: PropTypes.string,
				contentType: PropTypes.string,
				details: PropTypes.shape({}),
			}),
		}),
		title: PropTypes.shape({
			[fallbackLang]: PropTypes.string,
		}),
		descirption: PropTypes.shape({
			[fallbackLang]: PropTypes.string,
		}),
	}),
	sys: PropTypes.shape({
		id: PropTypes.string,
	}),
});

export const pageLinkPropType = PropTypes.shape({
	fields: PropTypes.shape({
		title: PropTypes.shape({
			[fallbackLang]: PropTypes.string,
		}),
		page: PropTypes.shape({
			[fallbackLang]: PropTypes.shape({
				fields: PropTypes.shape({
					slug: PropTypes.shape({}),
				}),
				sys: PropTypes.shape({
					id: PropTypes.string,
				}),
			}),
		}),
		hash: PropTypes.shape({
			[fallbackLang]: PropTypes.string,
		}),
	}),
	sys: PropTypes.shape({
		contentType: PropTypes.shape({
			sys: PropTypes.shape({
				type: PropTypes.oneOf(['Link']),
				id: PropTypes.oneOf(['pageLink']),
			}),
		}),
	}),
});

export const externalLinkPropType = PropTypes.shape({
	fields: PropTypes.shape({
		title: PropTypes.shape({
			[fallbackLang]: PropTypes.string,
		}),
		url: PropTypes.shape({
			[fallbackLang]: PropTypes.string,
		}),
		hash: PropTypes.shape({
			[fallbackLang]: PropTypes.string,
		}),
	}),
	sys: PropTypes.shape({
		contentType: PropTypes.shape({
			sys: PropTypes.shape({
				type: PropTypes.oneOf(['Link']),
				id: PropTypes.oneOf(['externalLink']),
			}),
		}),
	}),
});

export const linkPropType = PropTypes.oneOfType([pageLinkPropType, externalLinkPropType]);

export const langPropType = PropTypes.oneOf(['en-CA', 'fr-CA']);

export const contentPropType = PropTypes.shape({
	id: PropTypes.string,
	title: PropTypes.string,
	body: linkPropType,
	primaryLink: linkPropType,
	primaryLinkText: PropTypes.string,
	primaryLinkAccessibleText: PropTypes.string,
	secondaryLink: linkPropType,
	secondaryLinkText: PropTypes.string,
	secondaryLinkAccessibleText: PropTypes.string,
	primaryMedia: linkPropType,
	primaryMediaAccessibleText: PropTypes.string,
	blocks: PropTypes.arrayOf(PropTypes.shape({})),
});
