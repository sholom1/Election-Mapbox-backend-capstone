const Sequelize = require('sequelize');
const db = require('../db');

const Candidate = db.define('candidate', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  votes: {
    type: Sequelize.STRING,
    allowNull: false,
  },

});

module.exports = Candidate;
