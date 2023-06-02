export class ObjectsFns {
	static isEmptyObject(object) {
		return !object || Object.keys(object).length === 0;
	}
}