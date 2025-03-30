import {useEffect, useRef} from "react";
import {useSelector} from "react-redux";
import typeWriterSound from "../asset/typewritter.wav";
import mechanicalSound from "../asset/mech.mp3";

const useSound = () => {
	const {enableSound, sound} = useSelector((state) => state.settings);

	const ref = useRef(null);
	useEffect(() => {
		if (enableSound) {
			ref.current =
				sound == "mechanical"
					? new Audio(mechanicalSound)
					: new Audio(typeWriterSound);
		}
	}, [sound, enableSound]);

	return ref;
};

export default useSound;
