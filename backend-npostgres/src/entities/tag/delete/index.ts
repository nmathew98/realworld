export async function deleteTag(this: Context, _: never, ...records: any[]) {
	const article = records.find(
		article => article instanceof Article,
	) as InstanceType<typeof Article>;

	if (!article) throw new Error("Article not specified");

	const STATEMENT = "DELETE FROM ARTICLE_TAGS WHERE article=$1";

	await this.pg.query(STATEMENT, [article.uuid]);
}
