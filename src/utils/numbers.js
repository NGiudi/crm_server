export function parseToInt(string, defaultValue = 0) {
	let number = parseInt(string);

	if (isNaN(number)) {
		number = defaultValue;
	}

	return number;
}