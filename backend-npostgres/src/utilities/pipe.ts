import { pipe as _pipe } from "@graficos/pipe-js";

export const makePipe =
	(context: Context) =>
	(...fns: any[]) =>
		_pipe(
			...fns.flatMap(
				fn =>
					(...args: any[]) =>
						fn(null, ...args).bind(context),
			),
		);
