import type { H3Event } from "h3";
import { getCookie, send } from "h3";
import { zh } from "h3-zod";

import { unfollowUser as _unfollowUser } from "../../entities/user/delete";
import { makeUser } from "../../entities/user/create";

export default eventHandler(async function unfollowUser(
	this: Context,
	event: H3Event,
) {
	const refreshToken = getCookie(
		event,
		AUTHENTICATION_COOKIE_KEYS.RefreshToken,
	);

	const params = (await zh.useValidatedParams(event, {
		username: USER_SCHEMA.username,
	})) as { username: string };

	await pipe(
		makeUser,
		toPipeable<typeof _unfollowUser>(_unfollowUser, params),
	)({ token: refreshToken });

	return send(event, null);
});
