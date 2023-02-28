import { createRouter } from "h3";
import { Client } from "pg";

const client = new Client();
await client.connect();

const context: Context = {
	pg: client,
};

/* eslint-disable */
const pipe = makePipe(context);

export const Router = createRouter();
