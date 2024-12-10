import React from "react";

const Word = ({children}) => {
	return <div className="word">{children}</div>;
};

export default React.memo(Word);
