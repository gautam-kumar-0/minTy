import React, {memo} from "react";
import PropTypes from "prop-types";
import Key from "./Key";

const Row = memo(({keys, className, activeKey}) => {
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
});

Row.propTypes = {
	keys: PropTypes.arrayOf(PropTypes.string).isRequired,
	className: PropTypes.string.isRequired,
	activeKey: PropTypes.string.isRequired,
};

export default Row;
