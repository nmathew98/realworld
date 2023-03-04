import { randomUUID } from "node:crypto";
import { hoursToMilliseconds } from "date-fns";

import type { UserTokens } from "../../../records/user";

export async function makeUser(
	this: Context,
	{ username, email, password, token, generateTokens }: Partial<MakeUserArgs>,
) {
	if (!process.env.JWT_ACCESS_EXPIRES)
		throw new Error("Environment variable `JWT_ACCESS_EXPIRES` is not defined");
	if (!process.env.JWT_REFRESH_EXPIRES)
		throw new Error(
			"Environment variable `JWT_REFRESH_EXPIRES` is not defined",
		);

	if (username && email && password) {
		const STATEMENT = `INSERT INTO USERS(uuid, username, email, password) 
			VALUES($1, $2, $3, $4) 
			RETURNING uuid, username, email`;

		const hashedPassword = await this.hasher.hash(password);

		const result = await this.pg.query(STATEMENT, [
			randomUUID(),
			username,
			email,
			hashedPassword,
		]);

		return new User({
			...result.rows[0],
			tokens: await makeTokens.bind(this)(result.rows[0].uuid),
		});
	} else if (token) {
		const verificationResult = await this.jwt.verify(
			token,
			process.env.JWT_REFRESH_SECRET,
		);

		return new User({ uuid: verificationResult.sub });
	} else if (email && password) {
		const STATEMENT = `SELECT uuid, username, password FROM USERS WHERE email=$1`;

		const allResults = await this.pg.query(STATEMENT, [email]);

		if (allResults.rows.length !== 1)
			throw new HTTPError(401, "Unauthorized", "Credentials are invalid");

		const result = { ...allResults.rows[0] };

		const isPasswordValid = await this.hasher.verify(password, result.password);

		if (!isPasswordValid)
			throw new HTTPError(401, "Unauthorized", "Credentials are invalid");

		if (!generateTokens) return new User(result);

		return new User({
			...result,
			email,
			tokens: await makeTokens.bind(this)(result.uuid),
		});
	}

	throw new Error("Invalid arguments");
}

async function makeTokens(this: Context, uuid: string): Promise<UserTokens> {
	const accessTokenExpiresIn = hoursToMilliseconds(
		Number(process.env.JWT_ACCESS_EXPIRES) || 1,
	);
	const refreshTokenExpiresIn = hoursToMilliseconds(
		Number(process.env.JWT_REFRESH_EXPIRES) || 1,
	);

	return {
		accessToken: {
			value: await this.jwt.sign(
				{ sub: uuid },
				process.env.JWT_ACCESS_SECRET,
				accessTokenExpiresIn,
			),
			expiresIn: accessTokenExpiresIn,
		},
		refreshToken: {
			value: await this.jwt.sign(
				{ sub: uuid },
				process.env.JWT_REFRESH_SECRET,
				refreshTokenExpiresIn,
			),
			expiresIn: refreshTokenExpiresIn,
		},
	};
}

interface MakeUserArgs {
	username: string;
	email: string;
	password: string;
	token: string;
	generateTokens: boolean;
	hydrate?: boolean;
}
