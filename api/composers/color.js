const { ColorData } = require('../../db/models');
/**
 * Returns a randomized color hexcode
 * @returns {String} color
 */
const getRandomColor = () => {
	let characters = '0123456789ABCDEF';
	let color = '#';
	for (let i = 0; i < 6; i++) {
		color += characters[Math.floor(Math.random() * 16)];
	}
	return color;
};
/**
 * Returns the color associated with this candidate
 * Will Return grey if not found
 * @param {String} candidate
 * @param {ColorData} colors
 * @returns {String}
 */
const getCandidateColor = async (candidate, colors) => {
	//Exit early if the color is predetermined
	if (candidate === 'Others') return '#000000';
	if (candidate === 'Total Votes') return '#C0C0C0';
	if (colors == undefined) {
		colors = await ColorData.findAll()[0];
	}
	//TODO: implement options for tag handling
	//Remove tag
	let mCandidate = candidate.replace(/ *\([^)]*\) */g, '');
	if (colors.candidates[mCandidate] == undefined) {
		//TODO: Add default colors
		ColorObject.candidates[mCandidate] = getRandomColor();
	}
	return ColorObject.candidates[mCandidate];
};
module.exports = {
	getCandidateColor,
	getRandomColor,
};
