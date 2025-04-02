import {memo} from "react";
import Key from "./Key";

const Row = ({keys, className, activeKey}) => {
	return (
		<div className={`${className} row`}>
			{keys.map((key, index) => (
				<Key
					key={`${key}-${index}`}
					keyName={key}
					isActive={index === activeKey}
				/>
			))}
		</div>
	);
};

export default memo(Row);
