import { createServer } from "node:http";
import {
	createApp,
	eventHandler,
	getHeaders,
	getMethod,
	getQuery,
	getRouterParams,
	toNodeListener,
} from "h3";
import { defineCorsEventHandler } from "@nozomuikuta/h3-cors";
import consola from "consola";

import { Router } from "./routes";
import apiInformation from "../package.json";

const app = createApp();
app.use(
	defineCorsEventHandler({
		/* ... */
	}),
);
app.use(
	"/",
	eventHandler(e => {
		const url = e.req.url;

		consola.info(`[HTTP ${e.req.httpVersion}] ${getMethod(e)} ${url}`);
		consola.info(`[${url}] headers: ${JSON.stringify(getHeaders(e), null, 2)}`);
		consola.info(
			`[${url}] query params: ${JSON.stringify(getQuery(e), null, 2)}`,
		);
		consola.info(
			`[${url}] route params: ${JSON.stringify(
				getRouterParams(e),
				null,
				2,
			)}`,
		);
	}),
);
app.use(`/api/${apiInformation.version}`, Router.handler);

const PORT = process.env.PORT || 3000;
createServer(toNodeListener(app)).listen(PORT);
consola.info(`Listening on port ${PORT}`);
