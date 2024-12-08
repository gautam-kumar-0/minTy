import React from "react";

const Letter = ({character, className}) => {
	return <span className={`${className} letter`}>{character}</span>;
};

export default React.memo(Letter);
