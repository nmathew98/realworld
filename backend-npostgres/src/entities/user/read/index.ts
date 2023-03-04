export async function getProfile(
	this: Context,
	{ username }: GetProfileArgs,
	...records: any[]
) {
	const user = records.find(user => user instanceof User);

	if (!user || !username) throw new Error("No user specified");

	const WHERE = user ? "uuid=$1" : "username=$1";
	const STATEMENT = `SELECT uuid, username, bio, image FROM USERS WHERE ${WHERE}`;

	const allResults = await this.pg.query(STATEMENT, [user?.uuid ?? username]);

	if (user) {
		const STATEMENT = `SELECT isActive FROM USERS_FOLLOWS WHERE (origin=$1 AND destination=$2)`;

		const allFollowingResults = await this.pg.query(STATEMENT, [user.uuid]);

		if (allResults.length > 1)
			throw new Error("Unexpected error: More than 1 relationship found");

		const isFollowing = allFollowingResults.rows[0];

		return new User({
			...allResults.rows[0],
			isFollowing: isFollowing.isActive,
		});
	}

	const result = allResults.rows[0];

	return new User({
		...result,
		isFollowing: false,
	});
}

interface GetProfileArgs {
	username?: string;
}
