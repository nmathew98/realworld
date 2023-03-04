import { asyncPipe } from "@graficos/pipe-js";

import { CONTEXT } from "./context";

const makePipe =
	(context: Context) =>
	(...fns: FnWithContext[]) => {
		const boundFns = fns.map((fn, index) => {
			if (index === 0) return fn.bind(context);

			// We're taking args as a spread array so that unit tests don't become convoluted,
			// flattening just in case
			return (...records: Collection[]) =>
				fn.call(context, undefined, ...records.flat());
		});

		return asyncPipe(...boundFns);
	};

export const pipe = makePipe(CONTEXT);
export const pop = (...args: Collection[]) => args.pop();

export type FnWithContext = (
	this: Context,
	args?: any,
	...records: Collection[]
) => Promise<Collection | Collection[]>;

export type Collection<T = any> = Record<string, any>;
