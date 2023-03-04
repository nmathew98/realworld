import type { H3Event } from "h3";
import { sendError as _sendError } from "h3";
import consola from "consola";

export class HTTPError extends Error {
	public status: number;
	public statusText: string;
	public body?: string;

	constructor(status: number, statusText: string, body?: string) {
		super();

		this.status = Number(status);
		this.statusText = `${statusText}`;
		this.body = body;
	}
}

export const sendError = (e: H3Event, error) => {
	if (process.env.NODE_ENV === "production") consola.error(error);

	return _sendError(e, error, process.env.NODE_ENV !== "production");
};
