import { createServer } from "node:http";
import {
	createApp,
	fromNodeMiddleware,
	toNodeListener,
	handleCors,
	getCookie,
	getQuery,
	send,
} from "h3";
import consola from "consola";
import morgan from "morgan";

import { Router } from "./routes";

consola.wrapAll();

const allowedOrigins: string[] = [];

const app = createApp({ debug: process.env.NODE_ENV !== "production" });
app.use(
	"*",
	eventHandler(async event =>
		handleCors(event, {
			origin: (origin: string) => allowedOrigins.includes(origin),
			credentials: false,
		}),
	),
);

app.use(
	"/origin/register",
	eventHandler(async event => {
		const token = getCookie(event, "internal");

		await Jwt.verify(token, process.env.JWT_INTERNAL_SECRET);

		const query = getQuery(event);

		if (query.uri) allowedOrigins.push(query.uri);

		send(event, null);
	}),
);

app.use(
	fromNodeMiddleware(
		morgan(process.env.NODE_ENV === "production" ? "common" : "dev"),
	),
);
app.use("/api", Router.handler);

const PORT = process.env.PORT || 3000;
createServer(toNodeListener(app)).listen(PORT);
consola.info(`[api] listening on port ${PORT}`);
