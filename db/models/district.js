const Sequelize = require('sequelize');
const db = require('../db');

const District = db.define('district', {
	districtnumber: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	
	totalvotes: {
		type: Sequelize.STRING,
		allowNull: false,
	},

	winnerid: {
		type: Sequelize.STRING,
		allowNull: false,
	},

	color: {
		type: Sequelize.STRING,
	},

	victoryMargin: {
		type: Sequelize.FLOAT,
		validate: {
			min: 0.0,
			max: 1.0,
		},
	},
});

module.exports = District;
