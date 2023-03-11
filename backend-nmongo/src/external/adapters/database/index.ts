import SQLParser from "@synatic/noql";
import consola from "consola";
import { MongoClient } from "mongodb";
import { createHash } from "node:crypto";

interface Database {
	query: <T = Record<string, any>>(
		query: string,
		parameters: any[],
	) => Promise<T>;
}

export const makeDatabase = async () => {
	if (!process.env.MONGO_URI)
		throw new Error("Environment variable `MONGO_URI` is not specified");
	if (!process.env.MONGO_DB)
		throw new Error("Environment variable `MONGO_DB` is not specified");

	const client = new MongoClient(process.env.MONGO_URI);
	await client.connect();
	const database = await client.db(process.env.MONGO_DB);

	consola.success(
		`[mongo] connected to ${process.env.MONGO_URI} using database ${process.env.MONGO_DB}`,
	);

	const compiledQueries = new Map<
		string,
		ReturnType<typeof SQLParser.paseSQL>
	>();

	const compileQuery = (query: string) => {
		const md5 = createHash("md5").update(query).digest("hex");

		if (compiledQueries.has(md5)) return compiledQueries.get(md5);

		const parsed = SQLParser.parseSQL(query);

		compiledQueries.set(md5, parsed);

		return parsed;
	};

	const subParameters = (parsed: Record<string, any>, parameters: any[]) =>
		Object.fromEntries(
			Object.entries(parsed).map(([key, value]) => {
				if (typeof value === "object")
					return [key, subParameters(value, parameters)];

				const parameterRegex = /\$\d+/;
				if (typeof value === "string" && parameterRegex.test(value)) {
					const index = Number(value.replaceAll("$", ""));

					if (!Number.isInteger(index))
						throw new Error(
							`[mongo] could not determine parameter index for value \`${value}\``,
						);

					if (parameters.at(index) === undefined)
						throw new Error(`[mongo] parameter \`${value}\` not specified`);

					if (
						typeof parameters.at(index) === "object" &&
						parameters.at(index)?.then
					)
						throw new Error(
							`[mongo] parameter \`${value}\` cannot be a Promise`,
						);

					return [key, parameters.at(index)];
				}

				return [key, value];
			}),
		);

	const query = (query: string, parameters?: any[]) => {
		const parsed = compileQuery(query);

		const subbed = subParameters(parsed, parameters ?? []);

		if (subbed.type === "query")
			return database
				.collection(subbed.collection)
				.find(
					subbed.query || Object.create(null),
					subbed.projection || Object.create(null),
				)
				.limit(subbed.limit || 50)
				.toArray();
		else if (subbed.type === "aggregate")
			return database
				.collection(subbed.collections[0])
				.aggregate(subbed.pipeline)
				.toArray();

		throw new Error("Unexpected error occurred");
	};

	return Object.freeze({
		query,
	}) as Database;
};
