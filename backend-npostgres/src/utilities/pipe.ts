import { asyncPipe } from "@graficos/pipe-js";

export const makePipe =
	(context: Context) =>
	(...fns: any[]) =>
		asyncPipe(
			...fns.map(
				fn =>
					(...args: any[]) =>
						fn(null, ...args).bind(context),
			),
		);
