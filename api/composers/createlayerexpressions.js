const { Candidate } = require('../../db/models');

class LayerExpressions {
	constructor(districts, features) {
		this.districtsInExpression = [];
		this.colorExpression = ['match', ['get', 'elect_dist']]; //[('get', 'color')]
		this.opacityExpression = ['match', ['get', 'elect_dist']]; //['get', 'opacity'];;
		for (let featureData of features) {
			let districtNumber = featureData.properties.elect_dist;
			let opacity;
			if (districtNumber == undefined) continue;
			if (districtNumber in this.districtsInExpression) continue;
			if (districts[districtNumber] !== undefined) {
				if (districts[districtNumber]['Total Votes'] > 0) {
					opacity = districts[districtNumber].victoryMargin;
					this.colorExpression.push(districtNumber, districts[districtNumber].color);
					this.opacityExpression.push(districtNumber, opacity);
					this.districtsInExpression.push(districtNumber);
					continue;
				}
			}
			this.colorExpression.push(districtNumber, '#C0C0C0');
			this.opacityExpression.push(districtNumber, '1');
			this.districtsInExpression.push(districtNumber);
		}
	}
}
module.exports = LayerExpressions;
