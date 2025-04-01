import {useEffect, useRef} from "react";
import {useSelector} from "react-redux";
import typeWriterSound from "../asset/typewritter.wav";
import mechanicalSound from "../asset/mech.mp3";

const useSound = () => {
	const {enableSound, sound} = useSelector((state) => state.settings);

	const ref = useRef(null);

	const playSound = () => {
		if (ref.current) {
			if (!ref.current.paused) {
				ref.current.pause();
				ref.current.currentTime = 0;
			}
			ref.current.play();
		}
	};

	useEffect(() => {
		if (enableSound) {
			ref.current =
				sound === "mechanical"
					? new Audio(mechanicalSound)
					: new Audio(typeWriterSound);
			ref.current.load();
		}

		// Cleanup on unmount
		return () => {
			if (ref.current) {
				ref.current.pause();
				ref.current = null;
			}
		};
	}, [sound, enableSound]);

	return playSound;
};

export default useSound;
