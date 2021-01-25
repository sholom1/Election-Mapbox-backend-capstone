const Sequelize = require('sequelize');
const db = require('../db');

const ElectionMap = db.define('Election Map', {
	name: {
		type: Sequelize.STRING,
		allowNull: false,
		isEmpty: false,
	},
});

module.exports = ElectionMap;
