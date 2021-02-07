const express = require('express');
const router = express.Router();
const {
	ElectionMap,
	ElectionData,
	ColorData,
	DistrictLayer,
	Category,
	District,
	Candidate,
} = require('../../db/models');
const { generateMap } = require('../composers');

// Express Routes for election data files - Read more on routing at https://expressjs.com/en/guide/routing.html
router.get('/categories', (req, res, next) => {
	Category.findAll()
		.then((categories) => res.json(categories))
		.catch((err) => next(err));
});

router.get('/categories/:category', (req, res, next) => {
	ElectionMap.findAll({
		where: {
			category: req.params.category,
		},
		attributes: ['id', 'name'],
	})
		.then((maps) => {
			let result = [];
			for (let map of maps) {
				result.push({ name: map.name, id: map.id });
			}
			res.json(result);
		})
		.catch((err) => next(err));
});

router.post('/categories', (req, res, next) => {
	Category.create({
		name: req.body.category,
	})
		.then((category) => res.json(category))
		.catch((err) => next(err));
});
router.get('/:id', (req, res, next) => {
	console.log(req.params);
	ElectionMap.findOne({
		where: {
			id: req.params.id,
		},
	})
		.then((retrievedMap) => {
			//console.log(retrievedMap);
			res.json(retrievedMap);
		})
		.catch((err) => next(err));
});
router.get('/', (req, res, next) => {
	ElectionMap.findAll()
		.then((maps) => res.json(maps))
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
	const { excelFile, layerFile, colorFile, name, category } = req.body;
	ElectionData.findByPk(excelFile)
		.then((sheet) => {
			if (!sheet) throw new Error('The sheet could not be found');
			DistrictLayer.findByPk(layerFile)
				.then(async (layer) => {
					const colorData = await ColorData.findByPk(colorFile);
					const sheets = [sheet];
					const createdMap = await generateMap(name, sheets, layer, colorData, category);
					res.json(createdMap);
				})
				.catch((err) => {
					res.status(404).send(`The DistrictLayer with the primary key of ${layerFile} could not be found`);
					next(err);
				});
		})
		.catch((err) => {
			res.status(404).send(`The sheet with the primary key of ${excelFile} could not be found`);
			next(err);
		});
});

// Export our router, so that it can be imported to construct our api routes
module.exports = router;
