import {useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import typeWriterSound from "../assests/typewritter.wav";
import mechanicalSound from "../assests/mech.mp3";

const useSound = () => {
	const {enableSound, sound} = useSelector((state) => state.settings);

	const ref = useRef(null);
	useEffect(() => {
		if (enableSound) {
			sound == "mechanical"
				? (ref.current = new Audio(mechanicalSound))
				: (ref.current = new Audio(typeWriterSound));
		}
	}, [sound, enableSound]);

	return ref;
};

export default useSound;
