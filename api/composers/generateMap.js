const Sequelize = require('sequelize');
const { ElectionMap, District, Candidate } = require('../../db/models');
const DistrictCandidateObject = require('./districtcandidateobject');
const createDistricts = require('./createdistricts');
const LayerExpressions = require('./createlayerexpressions');

const generateMap = async (name, sheets, districtLayer, colordata, category) => {
	//console.log(DistrictCandidateObject);
	let results = DistrictCandidateObject(sheets); //new DistrictCandidateObject(sheets);
	let districts = await createDistricts(results, colordata);
	let geoJson = districtLayer.dataValues.data;
	let { colorExpression, opacityExpression } = new LayerExpressions(results, geoJson.features, colordata);
	ElectionMap.create({
		name,
		layers: { colorExpression, opacityExpression },
		geoJson,
		districts: results,
		category,
	}).then((result) => {
		result.setDistricts(districts);
		result.setGeojson(geojson);
	});
};
module.exports = generateMap;
