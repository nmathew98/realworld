import { createServer } from "node:http";
import {
	createApp,
	fromNodeMiddleware,
	toNodeListener,
	isCorsOriginAllowed,
	getRequestHeader,
	createError,
} from "h3";
import consola from "consola";
import morgan from "morgan";

import { Router } from "./routes";

consola.wrapAll();

const allowedOrigins: string[] = [];

const app = createApp({ debug: process.env.NODE_ENV !== "production" });

app.use(
	fromNodeMiddleware(
		morgan(process.env.NODE_ENV === "production" ? "common" : "dev"),
	),
);

app.use(
	eventHandler(async event => {
		const isAllowed = isCorsOriginAllowed(getRequestHeader(event, "origin"), {
			origin: (origin: string) => {
				if (process.env.NODE_ENV === "production")
					return allowedOrigins.includes(origin);

				return true;
			},
		});

		if (!isAllowed)
			return sendError(
				event,
				createError({
					message: "CORS origin not allowed",
					statusCode: 403,
					statusMessage: "CORS origin not allowed",
					statusText: "CORS origin not allowed",
				}),
			);
	}),
);

app.use("/api", Router.handler);

const PORT = process.env.PORT || 3000;
createServer(toNodeListener(app)).listen(PORT);
consola.info(`[api] listening on port ${PORT}`);
