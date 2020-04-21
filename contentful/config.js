const space = 'y9kx4mbdq4n2';

// Using environment/build branch
const isPreview = process.env.BRANCH !== 'master';

const deliveryConfig = {
	accessToken:
		process.env.CONTENTFUL_DELIVERY_TOKEN || 'xgcLee_Mh93XI-lD7c6qe3ZeOV3HeoOHwUW29E6TTik',
	host: 'cdn.contentful.com',
};

const previewConfig = {
	accessToken:
		process.env.CONTENTFUL_PREVIEW_TOKEN || 'FWHVVd0E5w1NtORYgh7NTWxR7Bv6Xp_FGDPGDJv4kQ8',
	host: 'preview.contentful.com',
};

module.exports = {
	space,
	isPreview,
	...(isPreview ? previewConfig : deliveryConfig),
	environment: 'master',
	siteSlug: 'dx-starter-kit',
	// default lang can change, depending on if it's a French-first site
	defaultLang: 'en-CA',
	// fallback lang should always be 'en-CA' unless the space configuration changes
	fallbackLang: 'en-CA',
};
