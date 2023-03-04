import { createServer } from "node:http";
import { createApp, fromNodeMiddleware, toNodeListener } from "h3";
import { defineCorsEventHandler } from "@nozomuikuta/h3-cors";
import consola from "consola";
import morgan from "morgan";

import { Router } from "./routes";

consola.wrapAll();

const app = createApp({ debug: process.env.NODE_ENV !== "production" });
app.use(
	defineCorsEventHandler({
		/* ... */
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
