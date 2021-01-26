const { Candidate } = require('../../db/models');

class LayerExpressions {
	constructor(districts, features) {
		this.districtsInExpression = [];
		this.colorExpression = ['match', ['get', 'elect_dist']];
		this.opacityExpression = ['match', ['get', 'elect_dist']];
		for (featureData of features) {
			let districtNumber = featureData.properties.elect_dist;
			let opacity;
			if (districtNumber == undefined) continue;
			if (district in this.districtsInExpression) continue;
			if (districts[districtNumber] !== undefined) {
				if (districts[districtNumber]['Total Votes'] > 0) {
					opacity = districts[districtNumber].victoryMargin;
					this.colorExpression.push(districts[districtNumber].color, districtNumber);
					this.opacityExpression.push(opacity);
					this.districtsInExpression.push(districtNumber);
					continue;
				}
			}
			this.colorExpression.push('#C0C0C0', districtNumber);
			this.opacityExpression.push(1, districtNumber);
			this.districtsInExpression.push(districtNumber);
		}
	}
}
module.exports = LayerExpressions;
