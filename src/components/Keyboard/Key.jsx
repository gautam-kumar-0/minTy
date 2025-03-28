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
				keyRef.current.style.backgroundColor = `var(--key-bg-active)`;
				keyRef.current.style.boxShadow = `var(--key-shadow-active)`;
				keyRef.current.style.transitionDuration = `0s`;
			} else {
				keyRef.current.style.backgroundColor = `var(--key-bg-inactive)`;
				keyRef.current.style.boxShadow = `var(--key-shadow-inactive)`;
				keyRef.current.style.transitionDuration = `var(--transition-fast)`;
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
