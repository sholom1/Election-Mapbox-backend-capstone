const Sequelize = require('sequelize');
const db = require('../db');

const District = db.define('district', {
  totalvotes: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  winnerid: {
    type: Sequelize.STRING,
    allowNull: false,
  },

});

module.exports = District;