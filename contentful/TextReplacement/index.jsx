import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

function TextReplacement({ text, replacements }) {
	const rootClass = 'textReplacement';
	const replacementsMap = {
		'™': <sup className={`${rootClass}__sup`}>TM</sup>,
		'®': <sup className={`${rootClass}__sup`}>®</sup>,
		'🅪': <sup className={`${rootClass}__sup`}>MC</sup>,
		'🅫': <sup className={`${rootClass}__sup`}>MD</sup>,
		...replacements,
	};

	const regexArray = Object.keys(replacementsMap);
	const regexFromArray = new RegExp(regexArray.join('|'), 'gi');
	const matches = text.match(regexFromArray);
	const newText = text.split(regexFromArray);

	const formattedText =
		newText &&
		newText.reduce((prev, curr, index) => {
			if (newText.length - 1 !== index) {
				const symbol = regexArray.find(key => key.toLowerCase() === matches[index].toLowerCase());

				if (symbol) {
					return [
						prev,
						curr,
						React.cloneElement(replacementsMap[symbol], {
							// eslint-disable-next-line react/no-array-index-key
							key: `text-replacement-${index}`,
						}),
					];
				}
			}

			return [...prev, curr];
		}, []);

	return formattedText || text;
}

TextReplacement.propTypes = {
	text: PropTypes.string.isRequired,
	replacements: PropTypes.shape({}),
};

TextReplacement.defaultProps = {
	replacements: {},
};

export default TextReplacement;
