import type { H3Event } from "h3";
import { sendError as _sendError } from "h3";
import consola from "consola";
import { z } from "h3-zod";

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

export const toErrorResponse = (error: any, f: Function) => {
	const standardError = (
		debugInformation?: Record<string, any>,
		other?: Record<string, any>,
	) => {
		if (process.env.NODE_ENV !== "production")
			return {
				errors: {
					...other,
					debug: {
						...debugInformation,
					},
				},
			};

		return {
			errors: {
				...other,
			},
		};
	};

	if (error instanceof z.ZodError) {
		const issues = Object.fromEntries(
			error.issues.map(issue => [issue.path.pop(), issue.message]),
		);

		const debugInformation = {
			cause: {
				function: f.name,
				body: f.toString(),
			},
			stack: error.stack,
			message: error.message,
		};

		return standardError(debugInformation, issues);
	}

	const debugInformation = {
		cause: {
			function: f.name,
			body: f.toString(),
		},
		stack: error.stack,
		message: error.message,
		line: error.line,
		column: error.column,
	};

	return standardError(debugInformation, { message: error.message });
};

export const sendError = (e: H3Event, error) => {
	if (process.env.NODE_ENV === "production") consola.error(error);

	return _sendError(e, error, process.env.NODE_ENV !== "production");
};
