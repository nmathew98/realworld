import { defineConfig } from "tsup";
import AutoImport from "unplugin-auto-import/esbuild";

export default defineConfig({
	esbuildPlugins: [
		AutoImport({
			dirs: ["./src/value-objects", "./src/utilities", "./src/types"],
			eslintrc: {
				enabled: true,
			},
			dts: "./src/auto-imports.d.ts",
		}),
	],
	clean: true,
	minify: true,
});
