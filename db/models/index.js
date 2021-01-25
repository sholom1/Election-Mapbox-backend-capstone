const Player = require('./player');
const DistrictLayer = require('./districtlayer');

//ASSOICATIONS GO HERE -- Read more at https://sequelize.org/master/manual/assocs.html
//DistrictLayer.hasMany(Maps, {as:'maps'})

module.exports = {
	Player,
};
