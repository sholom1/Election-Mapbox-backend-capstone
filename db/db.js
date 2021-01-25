const Sequelize = require('sequelize');
const { name } = require('../package.json');
const dotenv = require('dotenv');
dotenv.config();

// Initialize database with Sequelize

const db = new Sequelize(name, process.env.DATABASE_USERNAME || 'postgress', process.env.DATABASE_PASSWORD, {
	host: process.env.DATABASE_IP || 'localhost',
	dialect: 'postgres',
	port: process.env.DATABASE_PORT || 5432,

	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000,
	},
	logging: false,
});

module.exports = db;
