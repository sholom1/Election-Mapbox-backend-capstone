const Sequelize = require('sequelize');
const db = require('../db');

const DistrictLayer = db.define('District Layer', {
	name: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	data: {
		type: Sequelize.JSONB,
		allowNull: false,
	},
});

module.exports = DistrictLayer;
