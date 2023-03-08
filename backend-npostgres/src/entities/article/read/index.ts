export async function getArticles(
	this: Context,
	{ limit = 20, offset = 0 }: GetArticlesArgs,
	...records: InstanceType<typeof Collection>[]
) {
	const user = records.find(user => user instanceof User) as InstanceType<
		typeof User
	>;

	const STATEMENT = `WITH article AS(
			SELECT 
				uuid,
				author,
				slug,
				title,
				description,
				body,
				created_at,
				updated_at 
			FROM ARTICLES
			LIMIT $1
			OFFSET $2
		), author AS(
			SELECT 
				uuid AS "author_uuid",
				username,
				bio,
				image
			FROM USERS
		)
		SELECT
			uuid,
			author,
			slug,
			title,
			description,
			body,
			created_at,
			updated_at,
			ARRAY(SELECT tag FROM ARTICLES_TAGS WHERE article=article.uuid) AS "tags",
			(SELECT
				is_active AS "is_favorited"
			FROM ARTICLES_FAVORITES
			WHERE ARTICLES_FAVORITES.article=article.uuid),			
			(SELECT 
				is_active AS "is_following" 
			FROM USERS_FOLLOWS 
			WHERE (origin=$3 AND destination=article.author)),
			(SELECT 
				COUNT(is_active) AS "favorites_count"
			FROM ARTICLES_FAVORITES
			WHERE (is_active=TRUE AND article=article.author)),
			username,
			bio,
			image,
			(COALESCE(
				(SELECT reltuples FROM PG_CLASS WHERE relname='ARTICLES'),
				(SELECT COUNT(*) FROM ARTICLES)
			)) AS "articles_count"
		FROM article
		INNER JOIN author ON article.author=author.author_uuid`;

	if (!user) throw new Error("User not specified");

	const allResults = await this.pg.query(STATEMENT, [limit, offset, user.uuid]);

	return allResults.rows.map(result => new Article(result));
}

interface GetArticlesArgs {
	limit?: number;
	offset?: number;
}