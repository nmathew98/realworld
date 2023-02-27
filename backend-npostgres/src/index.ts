import { createServer } from "node:http";
import { createApp, toNodeListener } from "h3";
import { defineCorsEventHandler } from "@nozomuikuta/h3-cors";

import { Router } from "./routes";

const app = createApp();
app.use(
	defineCorsEventHandler({
		/* ... */
	}),
);
app.use(Router);

const PORT = process.env.PORT || 3000;
createServer(toNodeListener(app)).listen(PORT);
