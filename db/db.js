const Sequelize = require('sequelize');
const { name } = require('../package.json');
const dotenv = require('dotenv');
dotenv.config();

// Initialize database with Sequelize

// --------------------------THIS SECTION OF CODE IS NO LONGER NECESSARY-----------------------------------
// const db = new Sequelize(name, process.env.DATABASE_USERNAME || 'postgress', process.env.DATABASE_PASSWORD, {
// 	host: process.env.DATABASE_IP || 'localhost',
// 	dialect: 'postgres',
// 	port: process.env.DATABASE_PORT || 5432,

// 	pool: {
// 		max: 5,
// 		min: 0,
// 		acquire: 30000,
// 		idle: 10000,
// 	},
// 	logging: false,
// });
//----------------------------------------------------------------------------------------------------

/* 
WHEN RUNNING WITH LOCAL DATABASE, .env FILE MUST CONTAIN:  
DATABASE_URL = 'postgres://<username>:<password>@localhost:5432/electionmapbackend' 
*/
const db = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
	protocol: 'postgres',
	
	//-----THIS SECTION MUST BE ENABLED WHEN RUNNING WITH HEROKU DATABASE, BUT DISABLED WHEN RUNNING WITH LOCAL DATABASE-------------
    // dialectOptions: {
    //     ssl: {
    //         sslmode: 'require',
    //         rejectUnauthorized: false
	// 	}	
	// }
	//---------------------------------------------------------------------------------------
});

module.exports = db;
