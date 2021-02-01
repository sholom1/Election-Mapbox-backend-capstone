//NODE MODULES
const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
const compression = require('compression');
const passport = require('passport');
const auth = require('./auth');
const cors = require('cors');
const path = require('path');

//IMPORTS/VARIABLES
const PORT = process.env.PORT || 8080;
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const db = require('./db');
const sessionStore = new SequelizeStore({ db });

const app = express();

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
	try {
		const user = await db.models.user.findByPk(id);
		done(null, user);
	} catch (err) {
		(err) => done(err);
	}
});
//CORS!
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: 'https://nycelectionmaps.netlify.app' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(morgan('tiny'));
//Mount on API
app.use('/api', require('./api'));
app.use('/auth', auth);

//START BACKEND SERVER FUNCTIOON
const serverRun = () => {
	const server = app.listen(PORT, () => {
		console.log(`Live on port : ${PORT}`);
	});
};
//DB Sync Function
//Optional parameters
// {force:true} - drops current tables and places new empty tables
//{alter:true} - This checks what is the current state of the table in the database (which columns it has, what are their data types, etc), and then performs the necessary changes in the table to make it match the model.

const syncDb = async () => {
	try {
		await db.sync({ force: true, alter: false });
	} catch (err) {
		console.log(err);
	}
};
// Connects to //postgres://localhost:5432/dbname

//Run server and sync DB
sessionStore.sync();
syncDb();
serverRun();

module.exports = app;
