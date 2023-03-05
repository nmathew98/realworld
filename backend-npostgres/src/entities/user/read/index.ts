import type { Collection } from "../../../utilities/pipe";

export async function getProfile(
	this: Context,
	{ username }: GetProfileArgs = DEFAULT_VALUES,
	...records: Collection[]
) {
	const user = records.find(user => user instanceof User);

	if (!user && !username) throw new Error("No user specified");

	const STATEMENT = `SELECT uuid, username, bio, image FROM USERS WHERE (uuid=$1 OR username=$2)`;

	const allResults = await this.pg.query(STATEMENT, [user?.uuid, username]);

	if (allResults.rows.length === 0) throw new Error("Invalid user specified");

	const randomUserProfile = allResults.rows.find(
		row => row.username === username,
	);
	const currentUserProfile = allResults.rows.find(
		row => row.uuid === user?.uuid,
	);

	if (user && username) {
		const STATEMENT = `SELECT is_active FROM USERS_FOLLOWS WHERE (origin=$1 AND destination=$2)`;

		const allFollowingResults = await this.pg.query(STATEMENT, [
			currentUserProfile.uuid,
			randomUserProfile.uuid,
		]);

		if (allFollowingResults.rows.length > 1)
			throw new Error(
				"Unexpected error: More than 1 following relationship found",
			);

		const isFollowing = allFollowingResults.rows[0];

		return new User({
			...randomUserProfile,
			isFollowing: !!isFollowing?.is_active,
		});
	}

	return new User({
		...currentUserProfile,
		isFollowing: false,
	});
}

const DEFAULT_VALUES = {
	username: null,
};

interface GetProfileArgs {
	username?: string | null;
}
