const express = require('express');
const router = express.Router();
const { DistrictLayer } = require('../../db/models');

router.get('/', (req, res, next) => {
	DistrictLayer.findAll()
		.then((layers) => {
			let data = [];
			for (let layer of layers) data.push({ name: layer.name, id: layer.id });
			res.json(data);
		})
		.catch((err) => next(err));
});
router.get('/:id', (req, res, next) => {
	DistrictLayer.findByPk(req.params.id)
		.then((Layer) => res.json(Layer))
		.catch((err) => next(err));
});

// router.post('/', (req, res, next) => {
// 	console.log(req.body);
// 	DistrictLayer.create({
// 		name: 'file',
// 		data: req.body.districtLayers[0],
// 	})
// 		.then((Layer) => {
// 			console.log(Layer);
// 			res.json({ name: Layer.name, id: Layer.id });
// 		})
// 		.catch((err) => next(err));
// });

router.post('/', (req, res, next) => {
	DistrictLayer.bulkCreate(
		req.body.districtLayers
	)
		.then((layer) => {
			console.log(layer);
			res.json(layer);
		})
		.catch((err) => next(err));
});

router.delete('/:id', (req, res, next) => {
	DistrictLayer.findByPk(req.params.id)
		.then((Layer) => {
			DistrictLayer.destroy({
				where: {
					id: req.params.id,
				},
			})
				.then(() => {
					res.json(Layer);
				})
				.catch((err) => next(err));
		})
		.catch((err) => next(err));
});

module.exports = router;
