const Sequelize = require('sequelize');
const { ElectionMap, District, Candidate } = require('../../db/models');
const DistrictCandidateObject = require('./districtcandidateobject');
const createDistricts = require('./createdistricts');
const LayerExpressions = require('./createlayerexpressions');

const generateMap = async (name, sheets, geojson, colordata) => {
	//console.log(DistrictCandidateObject);
	let results = DistrictCandidateObject(sheets); //new DistrictCandidateObject(sheets);
	let districts = await createDistricts(results);
	let { colorExpression, opacityExpression } = new LayerExpressions(districts, geojson.features);
	ElectionMap.create({
		name,
		layers: { colorExpression, opacityExpression },
	}).then((result) => {
		result.setDistricts(districts);
	});
};
module.exports = generateMap;
