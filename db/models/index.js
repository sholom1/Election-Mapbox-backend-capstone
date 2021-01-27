const Player = require('./player');
const DistrictLayer = require('./districtlayer');
const Candidate = require('./candidate');
const ElectionMap = require('./electionmap');
const District = require('./district');
const ElectionData = require('./electiondata');
const ColorData = require('./colordata');
const User = require('./user');

//ASSOICATIONS GO HERE -- Read more at https://sequelize.org/master/manual/assocs.html
ElectionMap.belongsTo(DistrictLayer);
DistrictLayer.hasMany(ElectionMap, { as: 'Maps' });
District.hasMany(Candidate, { as: 'Candidates' });
Candidate.belongsTo(District);
ElectionMap.hasMany(District, { as: 'Districts' });
District.belongsTo(ElectionMap);

module.exports = {
	Player,
	Candidate,
	Player,
	DistrictLayer,
	ElectionMap,
	District,
	ElectionData,
	ColorData,
	User,
};
