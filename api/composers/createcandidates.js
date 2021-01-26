const Sequelize = require('sequelize');
const { Candidate, ColorData } = require('../../db/models');
const { getCandidateColor } = require('./color');
/**
 *
 * @param {Object} district
 */
export const createCandidates = async (district) => {
	let records = [];
	let highestCandidate;
	for (let name in district) {
		let candidate = {
			name,
			votes: district[name],
			color: getCandidateColor(name),
		};
		if (highestCandidate != undefined && candidate.votes > highestCandidate.votes) {
			highestCandidate = candidate;
		}
		records.push(candidate);
	}
	FinishedCandidates = await Candidate.bulkCreate(records);
	let winnerid;

	for (let candidate in FinishedCandidates) {
		if (candidate.name == highestCandidate.name && candidate.votes == highestCandidate.votes)
			winnerid = candidate.id;
	}

	return { FinishedCandidates, winnerid, highestCandidate };
};
