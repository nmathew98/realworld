// Don't use in the context of an article
export async function findTags(this: Context) {
	const STATEMENT = `SELECT DISTINCT tag FROM ARTICLE_TAGS`;

	const allResults = await this.pg.query(STATEMENT);

	return allResults.rows.map(row => new Tag(row.tag)) as string[];
}
