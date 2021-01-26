const express = require('express');
const router = express.Router();
const { DistrictLayer } = require('../db/models');

router.get('/', (req, res, next) => {
	DistrictLayer.findAll()
		.then((Layer) => res.json(Layer))
		.catch((err) => next(err));
});
router.get('/:id', (req, res, next) => {
	DistrictLayer.findByPk(req.params.id)
		.then((Layer) => res.json(Layer))
		.catch((err) => next(err));
});
router.post('/', (req, res, next) => {
	DistrictLayer.create({
		name: req.body.name,
		data: req.body.data,
	})
		.then((Layer) => {
			console.log(Layer);
			res.json(Layer.name);
		})
		.catch((err) => next(err));
});

module.exports = router;