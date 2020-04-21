const slugify = text => {
	// Replace space with dash
	const regex = /\s+|_+/g;
	return text && text.replace(regex, '-').toLowerCase();
};

module.exports = {
	slugify,
};
