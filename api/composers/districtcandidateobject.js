const xlsx = require('xlsx');

class DistrictCandidateObject {
	/**
	 * Returns a new DistrictCandidateObject
	 * @param {Array<xlsx.Sheet>} sheets
	 */
	constructor(sheets = []) {
		//Iterate through the supplied sheets
		for (let worksheet of sheets) {
			//parse rows & columns
			let range = xlsx.utils.decode_range(worksheet['!ref']);
			//The worksheet may contain some data that is irrelevant
			//or some entry names that need to be renamed.
			let nameChanges = {
				filter: [
					'Manually Counted Emergency',
					'Absentee / Military',
					'Federal',
					'Affidavit',
					'Scattered',
					'Absentee/Military',
					'Emergency',
					'Special Presidential',
				],
				conversion: {
					'Public Counter': 'Total Votes',
				},
			};
			//Iterate through the rows
			//range.s.r is the starting row (typically zero based)
			//range.e.r is the last row of the sheet
			//The prefix is used to temporarily cache assembly district data
			for (let row = range.s.r, prefix = {}; row < range.e.r; row++) {
				let name = worksheet['C' + rowIndexAsString(row)].v;
				//Exit early if the name of this row is irrelevant
				if (nameChanges.filter.includes(name)) {
					continue;
				}
				//If this is a name we want to convert then do so in place.
				if (nameChanges.conversion[name]) {
					name = nameChanges.conversion[name];
				}
				//column A contains the assembly district number
				//if we are in a new assembly district then update the prefix object
				if (prefix.number != worksheet['A' + rowIndexAsString(row)].v) {
					prefix = {
						number: worksheet['A' + rowIndexAsString(row)].v,
						color: getRandomColor(),
					};
				}
				let districtNumber = joinDistrictNumbers(
					prefix.number.toString(),
					worksheet['B' + rowIndexAsString(row)].v.toString()
				);
				if (this[districtNumber] == undefined) {
					this[districtNumber] = { 'Total Votes': 0 };
				}
				let results = this[districtNumber];
				if (name != 'Total Votes') {
					results[name] = worksheet['D' + rowIndexAsString(row)].v;
					results['Total Votes'] += worksheet['D' + rowIndexAsString(row)].v;
				}
			}
		}
	}
}
/**
 * Increments the row by one and returns it as a string
 * @param {Number} row
 * @returns {String}
 */
const rowIndexAsString = (row) => {
	return (row + 1).toString();
};
/**
 * Returns the district number in the form ad0ed
 * where:
 *  ad: assembly district,
 *  ed: election district
 * @param {String} assemblyDistrict
 * @param {String} electionDistrict
 */
const joinDistrictNumbers = (assemblyDistrict, electionDistrict) => {
	while (electionDistrict.length <= 2) {
		electionDistrict = '0' + electionDistrict;
	}
	return parseInt(assemblyDistrict + electionDistrict);
};

module.exports = DistrictCandidateObject;
