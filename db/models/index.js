const Player = require('./player');
const DistrictLayer = require('./districtlayer');
const Candidate = require('./candidate');
const ElectionMap = require('./electionmap');
const District = require('./district');
const ElectionData = require('./electiondata');

//ASSOICATIONS GO HERE -- Read more at https://sequelize.org/master/manual/assocs.html
DistrictLayer.hasMany(ElectionMap, { as: 'Maps' });
District.hasMany(Candidate, { as: 'Candidates' });
ElectionMap.hasMany(District, { as: 'Districts' });

module.exports = {
	Player,
	Candidate,
	Player,
	DistrictLayer,
	ElectionMap,
	District,
	ElectionData,
};
