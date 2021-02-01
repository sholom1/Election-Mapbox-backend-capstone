const { Candidate } = require('../../db/models');
const { getCandidateColor } = require('./color');

class LayerExpressions {
	constructor(districts, features, colorData) {
		this.districtsInExpression = [];
		this.colorExpression = ['get', 'color'];
		this.opacityExpression = ['get', 'opacity'];
		let features = geoJSON.features;
		let districtsToRemove = [];
		for (let featureData of features) {
			let districtNumber = featureData.properties.elect_dist;
			let opacity;
			if (districtNumber == undefined) continue;
			if (districtNumber in this.districtsInExpression) continue;
			if (districts[districtNumber] !== undefined) {
				if (districts[districtNumber]['Total Votes'] > 0) {
					let nameResults = new NameBasedResults(districts[districtNumber], colorData);
					let color = nameResults.color;
					opacity = nameResults.highest.votes / districts[districtNumber]['Total Votes'];
					featureData.properties.color = color;
					featureData.properties.opacity = opacity;
					this.districtsInExpression.push(districtNumber);
					continue;
				}
			}
			districtsToRemove.push(featureData);
			featureData.properties.color = '#C0C0C0';
			featureData.properties.opacity = '1';
			this.districtsInExpression.push(districtNumber);
		}
		geoJSON.features = features.filter((element) => !districtsToRemove.includes(element.properties[districtKey]));
	}
}
class NameBasedResults {
	constructor(districtResults, colorData) {
		this.candidates = {};
		this.highest = {
			name: '',
			votes: 0,
		};
		this.isTie = true;
		this.totalVotes = 0;
		for (let candidate in districtResults) {
			if (districtResults[candidate] == undefined) continue;
			if (candidate == 'Total Votes') {
				continue;
			}
			let mCandidate = candidate.replace(/ *\([^)]*\) */g, '');
			if (mCandidate.length < 4) continue;
			if (this.candidates[mCandidate] == undefined) {
				this.candidates[mCandidate] = {
					votes: districtResults[candidate],
					color: getCandidateColor(candidate, colorData.dataValues.data),
				};
			} else {
				this.candidates[mCandidate].votes += districtResults[candidate];
			}
			this.totalVotes += districtResults[candidate];
			if (this.candidates[mCandidate].votes > this.highest.votes) {
				this.highest.name = mCandidate;
				this.highest.votes = this.candidates[mCandidate].votes;
				this.highest.color = this.candidates[mCandidate].color;
			}
		}
		for (let candidate in this.candidates) {
			if (this.candidates[candidate].votes == this.highest.votes) this.isTie = this.isTie && true;
			else this.isTie = this.isTie && false;
		}
		if (this.highest.name != '') this.highest.votes = this.candidates[this.highest.name].votes;
		else return;
		this.color = this.highest.color;
	}
}
NameBasedResults.prototype.toCandidateQueue = function () {
	let candidateArray = [];
	for (let candidate in this.candidates) {
		if (candidate == 'Total Votes') continue;
		candidateArray.push({
			name: candidate,
			color: this.candidates[candidate].color,
			votes: this.candidates[candidate].votes,
		});
	}
	let candidateQueue = new PriorityQueue(candidateArray, function (a, b) {
		return b.votes - a.votes;
	});
	return candidateQueue;
};
NameBasedResults.prototype.merge = function (other) {
	let candidates = {};
	for (let candidate in this.candidates) {
		candidates[candidate] = this.candidates[candidate].votes;
	}
	if (other instanceof NameBasedResults) {
		for (let candidate in other.candidates) {
			if (candidates[candidate] == undefined) {
				candidates[candidate] = other.candidates[candidate].votes;
			} else {
				candidates[candidate] += other.candidates[candidate].votes;
			}
		}
	} else {
		if (other['Total Votes'] == 0) return;
		for (let candidate in other) {
			if (candidates[candidate] == undefined) {
				candidates[candidate] = other[candidate];
			} else {
				candidates[candidate] += other[candidate];
			}
		}
	}
	Object.assign(this, new NameBasedResults(candidates));
};
module.exports = LayerExpressions;
