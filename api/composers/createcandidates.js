const Sequelize = require('sequelize');
const { Candidate, ColorData } = require('../../db/models');
const { getCandidateColor } = require('./color');
/**
 *
 * @param {Object} district
 */
export const createCandidates = async (district) => {
	let records = [];
	for (let name in district) {
		records.push({
			name,
			votes: district[name],
			color: getCandidateColor(name),
		});
	}

	return await Candidate.bulkCreate(records);
};
