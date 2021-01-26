const express = require('express');
const router = express.Router();
const { ElectionMap } = require('../db/models');

// Express Routes for election data files - Read more on routing at https://expressjs.com/en/guide/routing.html
router.get('/', (req, res, next) => {
	ElectionMap.findAll()
		.then((sheets) => res.json(sheets))
		.catch((err) => next(err));
});
router.get('/:id', (req, res, next) => {
	ElectionMap.findByPk(req.params.id)
		.then((sheet) => res.json(sheet))
		.catch((err) => next(err));
});

router.post('/', (req, res, next) => {
	/*First we need to take req.body.electionDataId and get it's sheet data
    //then get the req.body.districtLayerId and get it's JSONB
    //then if it exists we need req.body.colorDataId and get it's JSONB
    //functions from og repo to call in the following order:
    //new ElectionData() will be refactored to generate the District and Candidate models
    //The candidate models will include a color string, it can either be form the color data
    //or if the color data doesnt exist we can generate a random color
    //ElectionData() will also need to contain some of LayerExpressions like the color
    //computation and the victory margin
    //Then we will call the rest of the LayerExpressions function and assign the array
    //to the map model
    */
	ElectionMap.create({
		name: req.body.name,
		data: req.body.data,
	})
		.then((sheet) => {
			console.log(sheet);
			res.json(sheet.name);
		})
		.catch((err) => next(err));
});

// Export our router, so that it can be imported to construct our api routes
module.exports = router;
