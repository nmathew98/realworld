export async function updateArticle(
	this: Context,
	updates: UpdateArticleArgs,
	...records: InstanceType<typeof Collection>[]
) {
	const user = records.find(user => user instanceof User) as InstanceType<
		typeof User
	>;

	if (!user) throw new HTTPError(401, "Unauthorized");

	const filteredUpdates = Object.entries({
		...updates,
	})
		.filter(([, value]) => !!value)
		// TODO
		.filter(([key]) => key !== "tagList" && key !== "slug");

	const [SET, parameters] = filteredUpdates.reduce(
		([SET, parameters], [key, value], index, array) => [
			SET + `${key}=$${index + 1}` + delimit(index, array),
			[...parameters, value],
		],
		["SET ", [] as any[]],
	);

	const STATEMENT = `UPDATE ARTICLES 
		${SET}, slug=$${filteredUpdates.length + 1}
		WHERE slug=$${filteredUpdates.length + 2}
		RETURNING slug, uuid`;

	const newSlug = updates.title ? toSlug(updates.title) : updates.slug;

	const allResults = await this.pg.query(STATEMENT, [
		...parameters,
		newSlug,
		updates.slug,
	]);

	if (allResults.rows.length !== 1)
		throw new HTTPError(
			500,
			"Internal Server Error",
			"Unexpected error occurred",
		);

	const result = { ...allResults.rows[0] };

	return [user, new Article(result)];
}

const toSlug = (title: string) => title.toLowerCase().replace(/\s+/g, "-");

interface UpdateArticleArgs {
	slug: string;
	title?: string;
	description?: string;
	body?: string;
	tagList?: string[];
}
