export class Tag {
	public name: string;
	public article?: string;

	constructor(name: string, article?: string) {
		this.name = name;
		this.article = article;
	}
}
