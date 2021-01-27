const DistrictCandidateObject = require('./districtcandidateobject');
const generateMap = require('./generateMap');
const LayerExpressions = require('./createlayerexpressions');
const createDistricts = require('./createdistricts');
const createCandidates = require('./createcandidates');
const { getCandidateColor, getRandomColor } = require('./color');

module.exports = {
	DistrictCandidateObject,
	generateMap,
	LayerExpressions,
	createCandidates,
	createDistricts,
	getCandidateColor,
	getRandomColor,
};
