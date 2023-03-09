import {
	eventHandler as _eventHandler,
	setHeaders,
	setResponseStatus,
} from "h3";
import { z } from "h3-zod";

export const eventHandler = (f: HandlerWithContext) =>
	_eventHandler(async event => {
		try {
			return await f.call(CONTEXT, event);
		} catch (error: any) {
			if (error instanceof z.ZodError) {
				setResponseStatus(event, 400);
				setHeaders(event, {
					"Content-Type": "application/json",
				});

				return toErrorResponse(error, f);
			}

			if (error instanceof HTTPError)
				setResponseStatus(event, error.status, error.statusText);
			else setResponseStatus(event, 500);

			setHeaders(event, {
				"Content-Type": "application/json",
			});

			return toErrorResponse(error, f);
		}
	});

export type HandlerWithContext = (
	this: Context,
	...args: any[]
) => Promise<any>;
