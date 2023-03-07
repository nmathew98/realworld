import { Collection } from ".";

export class Tag extends Collection {
	private static _null?: EmptyTag;
	public uuid: string;
	public value: string;

	constructor(data: TagDBSchema) {
		super();

		this.uuid = data.uuid;
		this.value = data.tag;
	}

	static get null() {
		if (!Tag._null) Tag._null = new EmptyTag();

		return Tag._null;
	}
}

class EmptyTag extends Tag {
	constructor() {
		super({
			uuid: "EmptyTag",
			tag: "EmptyTag",
		});
	}
}

interface TagDBSchema {
	uuid: string;
	tag: string;
}
