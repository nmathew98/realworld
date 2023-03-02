export class Article {
	public ulid: string;
	public tags: string[]; // TODO

	constructor(data: Record<string, any>) {
		this.ulid = data.ulid;
		this.tags = data.tags; // TODO
	}
}
