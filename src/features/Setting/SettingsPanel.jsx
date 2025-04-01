import React from "react";
import styles from "./SettingsPanel.module.css";
import ThemeSetting from "./ThemeSetting";
import FreedomSetting from "./FreedomSetting";
import ConfidenceSetting from "./ConfidenceSetting";
import CursorSetting from "./CursorSetting";
import SoundSetting from "./SoundSetting";
import FontSetting from "./FontSetting";
import KeyboardSetting from "./KeyboardSetting";
import LiveStatsSetting from "./LiveStatsSetting";
import {PiSparkle} from "react-icons/pi";
import {FaKeyboard, FaMusic} from "react-icons/fa6";

function SettingsPanel() {
	return (
		<div className={styles.settingsPanel}>
			<h2 className={styles.title}>Settings</h2>

			<div className={styles.section}>
				<h3 className={styles.sectionTitle}>
					Appearance <PiSparkle />
				</h3>
				<ThemeSetting />
				<FontSetting />
				<CursorSetting />
			</div>

			<div className={styles.section}>
				<h3 className={styles.sectionTitle}>
					Behavior <FaKeyboard />
				</h3>
				<FreedomSetting />
				<ConfidenceSetting />
				<KeyboardSetting />
				<LiveStatsSetting />
			</div>

			<div className={styles.section}>
				<h3 className={styles.sectionTitle}>
					Audio <FaMusic />
				</h3>
				<SoundSetting />
			</div>
		</div>
	);
}

export default SettingsPanel;
