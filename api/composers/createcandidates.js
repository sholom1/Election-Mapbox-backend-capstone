const Sequelize = require('sequelize');
const { Candidate, ColorData } = require('../../db/models');
const { getCandidateColor } = require('./color');
/**
 *
 * @param {Object} district
 */
const createCandidates = async (district, colorData) => {
	let records = [];
	let highestCandidate = {
		name: 'No votes',
		votes: 0,
	};
	for (let name in district) {
		let candidate = {
			name,
			votes: district[name],
			color: getCandidateColor(name, colorData.dataValues.data),
		};
		if (name !== 'Total Votes' && (highestCandidate === undefined || candidate.votes > highestCandidate.votes)) {
			highestCandidate = candidate;
		}
		records.push(candidate);
	}
	FinishedCandidates = await Candidate.bulkCreate(records, { returning: true });
	let winnerid;

	for (let candidate of FinishedCandidates) {
		if (candidate.name == highestCandidate.name && candidate.votes == highestCandidate.votes) {
			winnerid = candidate.id;
			break;
		}
	}

	return { FinishedCandidates, winnerid, highestCandidate };
};
module.exports = createCandidates;
