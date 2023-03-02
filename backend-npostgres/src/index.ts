import { createServer } from "node:http";
import { createApp, toNodeListener } from "h3";
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
app.use(`/api/${apiInformation.version}`, Router.handler);

const PORT = process.env.PORT || 3000;
createServer(toNodeListener(app)).listen(PORT);
consola.info(`Listening on port ${PORT}`);
