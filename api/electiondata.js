const express = require('express');
const router = express.Router();
const { District, DistrictLayer, ElectionData } = require('../db/models');

// Express Routes for election data files - Read more on routing at https://expressjs.com/en/guide/routing.html
router.get('/', async (req, res, next) => {
	try {
		const allPlayers = await Player.findAll();
		// An if/ternary statement to handle not finding allPlayers explicitly
		!allPlayers ? res.status(404).send('Players Listing Not Found') : res.status(200).json(allPlayers);
	} catch (error) {
		next(error);
	}
});
router.post('/', (req, res, next) => {
	ElectionData.create({
		name: req?.body?.name,
		data: req?.body?.data,
	})
		.then((sheet) => {
			console.log(sheet);
			res.json(sheet.name);
		})
		.catch((err) => next(err));
});

// Export our router, so that it can be imported to construct our api routes
module.exports = router;
