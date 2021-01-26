const Sequelize = require('sequelize');
const { Map, District, Candidate } = require('../../db/models');
const { DistrictCandidateObject, createDistricts, LayerExpressions } = require('./index');

export const generateMap = async (name, sheets, geojson, colordata) => {
	let results = new DistrictCandidateObject(sheets);
	let districts = await createDistricts(results);
	let { colorExpression, opacityExpression } = new LayerExpressions(districts, geojson.features);
	Map.create({
		name,
		layers: { colorExpression, opacityExpression },
	}).then((result) => {
		result.setDistricts(districts);
	});
};
