export class HTTPError extends Error {
	public status: number;
	public statusText: string;
	public body?: string;

	constructor(status: string, statusText: string, body?: string) {
		this.status = Number(status);
		this.statusText = `${statusText}`;

		if (body) this.body = body;
	}
}
