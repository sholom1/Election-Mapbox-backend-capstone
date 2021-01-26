const Sequelize = require('sequelize');
const db = require('../db');

const ElectionData = db.define('Election Data', {
	name: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	data: {
		type: Sequelize.JSONB,
		allowNull: false,
	},
});

module.exports = ElectionData;
