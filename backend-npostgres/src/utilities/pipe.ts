import { asyncPipe } from "@graficos/pipe-js";

import { CONTEXT } from "./context";

export const pipe = (...fns: any[]) =>
	asyncPipe(
		...fns.map((fn, index, array) => {
			if (index === 0) return (...args: any[]) => fn.bind(CONTEXT)(...args);

			return (...args: any[]) => fn.bind(CONTEXT)(undefined, ...args);
		}),
	);
