const Sequelize = require('sequelize');
const db = require('../db');

const ColorData = db.define('Color Data', {
	name: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	data: {
		type: Sequelize.JSONB,
		allowNull: false,
	},
});
