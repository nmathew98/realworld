import { defineConfig } from "vitest/config";
import AutoImport from "unplugin-auto-import/vite";

export default defineConfig({
	test: {
		reporters: "verbose",
		include: ["**/*.{test,spec,e2e}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
	},
	plugins: [
		AutoImport({
			imports: ["vitest"],
			dts: "./src/.auto-imports.d.ts", // generate TypeScript declaration
		}),
	],
} as any);
