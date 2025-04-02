import React from "react";
import Key from "./Key";

const Row = ({keys, className, activeKey}) => {
	return (
		<div className={`${className} row`}>
			{keys.map((key, index) => (
				<Key
					key={`${key}-${index}`}
					keyName={key}
					isActive={key === activeKey}
				/>
			))}
		</div>
	);
};

export default Row;
