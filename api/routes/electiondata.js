const express = require('express');
const router = express.Router();
const { ElectionData } = require('../../db/models');

// Express Routes for election data files - Read more on routing at https://expressjs.com/en/guide/routing.html
router.get('/', (req, res, next) => {
	ElectionData.findAll({
		attributes: ['id', 'name'],
	})
		.then((sheets) => res.json(sheets))
		.catch((err) => next(err));
});
router.get('/:id', (req, res, next) => {
	ElectionData.findByPk(req.params.id)
		.then((sheet) => res.json(sheet))
		.catch((err) => next(err));
});
router.post('/', (req, res, next) => {
	ElectionData.bulkCreate(req.body.xlsxFiles)
		.then((xlsxData) => {
			console.log(xlsxData);
			res.json(xlsxData);
		})
		.catch((err) => next(err));
});

router.delete('/:id', (req, res, next) => {
	ElectionData.findByPk(req.params.id)
		.then((sheet) => {
			ElectionData.destroy({
				where: {
					id: req.params.id,
				},
			})
				.then(() => {
					res.json(sheet);
				})
				.catch((err) => next(err));
		})
		.catch((err) => next(err));
});

// Export our router, so that it can be imported to construct our api routes
module.exports = router;
