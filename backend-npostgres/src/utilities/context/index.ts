import pg from "pg";
import consola from "consola";

import { Hasher } from "./hasher";
import { Jwt } from "./jwt";

if (
	!process.env.POSTGRES_USER ||
	!process.env.POSTGRES_PASSWORD ||
	!process.env.POSTGRES_DB
)
	throw new Error(
		"Environment variables `POSTGRES_DB`, `POSTGRES_PASSWORD` and `POSTGRES_USER` must be specified",
	);

export const createContext = async () => {
	const client = new pg.Client({
		host: "postgres",
		database: process.env.POSTGRES_DB,
		user: process.env.POSTGRES_USER,
		password: process.env.POSTGRES_PASSWORD,
	});
	await client.connect();
	consola.success(
		`[postgres] connected as ${process.env.POSTGRES_USER} to database ${process.env.POSTGRES_DB}`,
	);

	return Object.freeze({
		pg: client,
		hasher: Hasher,
		jwt: Jwt,
	});
};

export const CONTEXT = await createContext();
