import { eventHandler as _eventHandler } from "h3";

export const eventHandler = (f: HandlerWithContext) =>
	_eventHandler(e => f.call(CONTEXT, e).catch(error => sendError(e, error)));

export type HandlerWithContext = (
	this: Context,
	...args: any[]
) => Promise<any>;
