const Sequelize = require('sequelize');
const db = require('../db');

const Category = db.define('Category', {
	name: {
		type: Sequelize.STRING,
		allowNull: false,
		isEmpty: false,
	},
});

module.exports = Category;
