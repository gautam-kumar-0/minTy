import React from "react";

const Space = ({className}) => {
	return <span className={`${className} letter space`}> </span>;
};

export default React.memo(Space);
