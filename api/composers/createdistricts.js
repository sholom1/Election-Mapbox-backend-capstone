const Sequelize = require('sequelize');
const createCandidates = require('./createcandidates');
const { District, Candidate } = require('../../db/models');

const createDistricts = async (electionResults, colorData) => {
	let districts = [];
	for (let districtnumber in electionResults) {
		let candidates = await createCandidates(electionResults[districtnumber], colorData);
		let district = await District.create(
			{
				districtnumber,
				totalvotes: electionResults[districtnumber]['Total Votes'],
				winnerid: candidates.winnerid,
				color: candidates.highestCandidate.color,
				victoryMargin: candidates.highestCandidate.votes / electionResults[districtnumber]['Total Votes'],
			},
			{ returning: true }
		);
		await district.setCandidates(candidates.FinishedCandidates);
		districts.push(district);
	}
	return districts;
};
module.exports = createDistricts;
