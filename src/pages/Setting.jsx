import React, {useState} from "react";
import {HexColorPicker} from "react-colorful";
import ThemeSettings from "../components/features/Setting/ThemeSetting";
// Optional: Default styles for react-colorful

const Setting = () => {
	return (
		<div className="main">
			<div>
				<h1>Hello, Gautam</h1>
			</div>
			<div>
				<h3>Look and Feel</h3>
				<div className="div">
					<ThemeSettings />
				</div>
			</div>
		</div>
	);
};

export default Setting;
