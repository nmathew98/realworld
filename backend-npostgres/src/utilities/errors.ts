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
