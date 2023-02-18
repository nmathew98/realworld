export class HTTPError extends Error {
	public statusText: string;
	public status: string;
	public response: Response;

	constructor(response: Response) {
		super();

		this.response = response;
		this.statusText = response.statusText;
		this.status = response.status;
	}
}
