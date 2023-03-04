export async function updateUser(
	this: Context,
	updates: Partial<UpdateUserArgs>,
	...records: any[]
) {
	const user = records.find(user => user instanceof User);

	if (!user) throw new Error("User not found");

	const filteredUpdates = Object.entries(updates).filter(
		([, value]) => !!value,
	);
	const [SET, parameters] = filteredUpdates.reduce(
		([SET, parameters], [key, value], index, array) => [
			SET + `SET ${key}=$${index + 1}]` + delimit(index, array),
			[...parameters, value],
		],
		["", [] as any[]],
	);

	const STATEMENT = `UPDATE USERS ${SET}
		WHERE uuid=$${filteredUpdates.length + 1}
		RETURNING uuid, username, email, password, image, bio`;

	const allResults = await this.pg.query(STATEMENT, parameters);

	if (allResults.rows.length !== 1)
		throw new HTTPError(
			500,
			"Internal Server Error",
			"Unexpected error occurred",
		);

	const result = { ...allResults.rows[0] };

	return new User(result);
}

interface UpdateUserArgs {
	email: string;
	username: string;
	password: string;
	image: string;
	bio: string;
}
