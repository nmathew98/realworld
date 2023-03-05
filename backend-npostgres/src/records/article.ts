export class Article {
	public uuid: string;
	public tags: string[]; // TODO

	constructor(data: Record<string, any>) {
		this.uuid = data.uuid;
		this.tags = data.tags; // TODO
	}
}
