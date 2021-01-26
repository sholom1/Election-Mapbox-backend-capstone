const router = require('express').Router();
module.exports = router;

// Mounts players api calls from api file on /api/players
router.use('/players', require('./routes/players'));
router.use('/electiondata', require('./routes/electiondata'));
router.use('/colordata', require('./routes/colordata'));
router.use('/districtlayer', require('./routes/districtlayer'));
router.use('/electionmap', require('./routes/electionmap'));

//Anything not found gets a 404
router.use((req, res, next) => {
	const error = new Error('Not Found');
	error.status = 404;
	next(error);
});

//Export our api so we can use it on our server index file(main exit point for server)
