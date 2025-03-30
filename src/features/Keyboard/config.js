export const keys = {
	" ": "space",
	Control: "ctrl",
	Alt: "alt",
	Enter: "↵", // Unicode for &hookleftarrow;
	Tab: "→", // Unicode for &rarr;
	CapsLock: "↑", // Unicode for &uarr;
	Shift: "shift", // Keeping it as a string
};

export const keyArray = [
	[keys.Tab, "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\"],
	[
		keys.CapsLock,
		"a",
		"s",
		"d",
		"f",
		"g",
		"h",
		"j",
		"k",
		"l",
		";",
		"'",
		keys.Enter,
	],
	["z", "x", "c", "v", "b", "n", "m", ",", ".", "/", keys.Shift],
	[keys.Control, keys[" "], keys.Alt],
];

// makes sure that space and shift are handled consistently
export const convertToKey = (e) => {
	if (keys[e.key]) return keys[e.key];
	if (e.shiftKey || e.getModifierState("CapsLock")) return e.key.toLowerCase();
	return e.key;
};
