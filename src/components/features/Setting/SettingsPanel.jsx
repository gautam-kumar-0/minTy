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

function SettingsPanel() {
	return (
		<div className={styles.settingsPanel}>
			<h2 className={styles.title}>Settings</h2>

			<div className={styles.section}>
				<h3 className={styles.sectionTitle}>Appearance</h3>
				<ThemeSetting />
				<FontSetting />
				<CursorSetting />
			</div>

			<div className={styles.section}>
				<h3 className={styles.sectionTitle}>Behavior</h3>
				<FreedomSetting />
				<ConfidenceSetting />
				<KeyboardSetting />
				<LiveStatsSetting />
			</div>

			<div className={styles.section}>
				<h3 className={styles.sectionTitle}>Audio</h3>
				<SoundSetting />
			</div>
		</div>
	);
}

export default SettingsPanel;
