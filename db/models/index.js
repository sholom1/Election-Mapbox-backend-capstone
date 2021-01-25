const Player = require('./player');
const DistrictLayer = require('./districtlayer');
const Candidate = require('./candidate');
const ElectionMap = require('./electionmap');
const District = require('./district');


//ASSOICATIONS GO HERE -- Read more at https://sequelize.org/master/manual/assocs.html
//DistrictLayer.hasMany(Maps, {as:'maps'})

module.exports = {
	Player,
	Candidate,
	Player,
	DistrictLayer,
  ElectionMap,
  District,
};
