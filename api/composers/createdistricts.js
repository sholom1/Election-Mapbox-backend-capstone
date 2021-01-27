const Sequelize = require('sequelize');
const { createCandidates } = require('./createcandidates');
const { District, Candidate } = require('../../db/models');

export const createDistricts = async (electionResults) => {
	let districts = [];
	for (let districtnumber in electionResults) {
		let candidates = await createCandidates(electionResults[districtnumber]);
		districts.push({
			ditrictnumber,
			totalvotes: electionResults[districtnumber]['Total Votes'],
			winnerid: candidates.winnerid,
			color: candidates.highestCandidate.color,
			victoryMargin: candidates.highestCandidate.votes / electionResults[districtnumber]['Total Votes'],
		});
	}
	return await District.bulkCreate(districts);
};
