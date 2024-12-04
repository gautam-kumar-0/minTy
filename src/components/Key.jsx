import React, {useRef, useEffect} from "react";
const Key = ({keyName, isActive}) => {
	const keyRef = useRef(null);

	useEffect(() => {
		if (keyRef.current) {
			if (isActive) {
				keyRef.current.style.backgroundColor = `rgba(85,250,173,0.7)`;
				keyRef.current.style.transitionDuration = `0s`;
			} else {
				keyRef.current.style.backgroundColor = `rgba(100,100,100,0.1)`;
				keyRef.current.style.transitionDuration = `500ms`;
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
