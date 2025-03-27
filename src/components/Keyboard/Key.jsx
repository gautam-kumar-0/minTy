import React, {useRef, useEffect} from "react";
const config = {
	theme: {
		primary: "",
	},
};
const Key = ({keyName, isActive}) => {
	const keyRef = useRef(null);

	useEffect(() => {
		if (keyRef.current) {
			if (isActive) {
				console.dir(keyRef.current);
				// the reason for using harcoding style instead of class is to
				// get control of transition duration to create the effect
				keyRef.current.style.backgroundColor = `rgba(85,250,173,0.7)`;
				keyRef.current.style.boxShadow = `0 0 1rem rgba(85,250,173,0.4)`;
				keyRef.current.style.transitionDuration = `0s`;
			} else {
				keyRef.current.style.backgroundColor = `rgba(100,100,100,0.1)`;
				keyRef.current.style.boxShadow = `0 0 0 transparent`;
				keyRef.current.style.transitionDuration = `300ms`;
			}
		}
	}, [isActive]);
	return (
		<div ref={keyRef} className="key">
			{keyName}
		</div>
	);
};

export default React.memo(Key);
