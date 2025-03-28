import React from "react";
import Key from "./Key";
const Row = ({keys, className, activeKey}) => {
	return (
		<div className={`${className} row`}>
			{keys.map((key, i) => {
				return <Key key={i} keyName={key} isActive={key == activeKey} />;
			})}
		</div>
	);
};

export default React.memo(Row);
