export async function getProfile(
	this: Context,
	{ username }: GetProfileArgs,
	...valueObjects: any[]
) {
	const user = valueObjects.find(user => user instanceof User);

	if (!user || !username) throw new Error("No user specified");

	const WHERE = user ? "uuid=$1" : "username=$1";
	const STATEMENT = `SELECT uuid, username, bio, image, following FROM USERS WHERE ${WHERE}`;

	const allResults = await this.pg.query(STATEMENT, [user?.uuid ?? username]);

	const result = allResults.rows[0];

	return new User(result);
}

interface GetProfileArgs {
	username?: string;
}
