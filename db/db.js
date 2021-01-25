const Sequelize = require('sequelize');
const { name } = require('../package.json');

// Initialize database with Sequelize
/*const db = new Sequelize(
  process.env.DATABASE_URL || `postgres://localhost:5432/${name}`,
  {
    logging: false,
  }
);
*/

const db = new Sequelize('electionmapbackend', 'postgres', 'palkia1', {
  host: 'localhost',
  dialect: 'postgres',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

  
});



module.exports = db;
