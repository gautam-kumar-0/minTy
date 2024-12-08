export const convertToKey = (e) => {
	if (e.key == " ") return "space";
	if (e.shiftKey) return e.key.toLowerCase();
	return e.key;
};
