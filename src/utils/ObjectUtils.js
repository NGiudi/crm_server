export class ObjectUtils {
	static isEmptyObject(object) {
		return !object || Object.keys(object).length === 0;
	}
}