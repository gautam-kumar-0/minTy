import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	env: {
		NODE_ENV: "dev",
	},
	base: "/minty/",
});
