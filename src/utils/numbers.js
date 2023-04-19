function parseToInt(string, defaultValue = 0) {
	let number = parseInt(string);

	if (number === isNaN) {
		number = defaultValue;
	}

	return number;
}

module.exports = {
	parseToInt,
};