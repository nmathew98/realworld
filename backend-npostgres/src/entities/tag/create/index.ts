export async function makeTag(this: Context, _: never, ...valueObjects: any[]) {
	const article = valueObjects.find(
		article => article instanceof Article,
	) as InstanceType<typeof Article>;

	if (!article) throw new Error("Article not specified");

	const tags = article.tags.map(tag => new Tag(tag, article.ulid));

	const [VALUES, parameters] = tags.reduce(
		(VALUES, tag, index, array) => [
			VALUES + `($${index + 1}, $${index + 2})` + delimit(index, array),
			[...parameters, tag.name, tag.article],
		],
		["", [] as any[]],
	);
	const STATEMENT = `INSERT INTO ARTICLE_TAGS(tag, article) VALUES ${VALUES}`;

	await this.pg.query(STATEMENT, parameters);
}
