import {
	eventHandler as _eventHandler,
	setHeaders,
	setResponseStatus,
} from "h3";
import { z } from "h3-zod";

export const eventHandler = (f: Parameters<typeof _eventHandler>[0]) =>
	_eventHandler(async event => {
		try {
			return await f.call(null, event);
		} catch (error: any) {
			setHeaders(event, {
				"Content-Type": "application/json",
			});

			if (error instanceof z.ZodError) {
				setResponseStatus(event, 400);

				return toErrorResponse(error, f);
			}

			if (error instanceof HTTPError)
				setResponseStatus(event, error.status, error.statusText);
			else setResponseStatus(event, 500);

			return toErrorResponse(error, f);
		}
	});
