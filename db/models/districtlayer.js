const Sequelize = require('sequelize');
const db = require('../db');

const DistrictLayer = db.define('District Layer', {
	data: {
		type: Sequelize.JSONB,
		allowNull: false,
	},
});

module.exports = DistrictLayer;
