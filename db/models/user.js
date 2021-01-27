const crypto = require('crypto');
const Sequelize = require('sequelize');
const db = require('../db');

const User = db.define('user', {
	email: {
		type: Sequelize.STRING,
		unique: true,
		allowNull: false,
	},
	password: {
		type: Sequelize.STRING,
		get() {
			return () => this.getDataValue('password');
		},
	},
	salt: {
		type: Sequelize.STRING,
		get() {
			return () => this.getDataValue('salt');
		},
	},
	googleId: {
		type: Sequelize.STRING,
	},

	Role: {
		type: Sequelize.ENUM(['User', 'Admin']),
		defaultValue: 'User',
		get() {
			return () => this.getDataValue('Role');
		},
	},
});

User.generateSalt = function () {
	return crypto.randomBytes(16).toString('base64');
};

User.encryptPassword = function (plainText, salt) {
	return crypto.createHash('RSA-SHA256').update(plainText).update(salt).digest('hex');
};

User.prototype.correctPassword = function (candidatePwd) {
	return User.encryptPassword(candidatePwd, this.salt()) === this.password();
};

const setSaltAndPassword = (user) => {
	if (user.changed('password')) {
		user.salt = User.generateSalt();
		user.password = User.encryptPassword(user.password(), user.salt());
	}
};

User.beforeCreate(setSaltAndPassword);
User.beforeUpdate(setSaltAndPassword);

module.exports = User;
