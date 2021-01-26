const express = require('express');
const router = express.Router();
const { ColorData } = require('../../db/models');

// Express Routes for color data files - Read more on routing at https://expressjs.com/en/guide/routing.html
router.get('/', (req, res, next) => {
	ColorData.findAll()
		.then((colorData) => res.json(colorData))
		.catch((err) => next(err));
});
router.get('/:id', (req, res, next) => {
	ColorData.findByPk(req.params.id)
		.then((colorData) => res.json(colorData))
		.catch((err) => next(err));
});
router.post('/', (req, res, next) => {
	ColorData.create({
		name: req.body.name,
		data: req.body.data,
	})
		.then((colorData) => {
			console.log(colorData);
			res.json(colorData.name);
		})
		.catch((err) => next(err));
});

router.delete('/:id', (req, res, next) => {
	ColorData.findByPk(req.params.id)
		.then((colorData) => {
			ColorData.destroy({
				where: {
					id: req.params.id,
				},
			})
				.then(() => {
					res.json(colorData);
				})
				.catch((err) => next(err));
		})
		.catch((err) => next(err));
});

// Export our router, so that it can be imported to construct our api routes
module.exports = router;
