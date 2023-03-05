import type { H3Event } from "h3";
import { getCookie, send } from "h3";
import { zh } from "h3-zod";

import { followUser as _followUser } from "../../entities/user/update";
import { makeUser } from "../../entities/user/create";

export default eventHandler(async function followUser(
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

	await pipe<typeof makeUser, typeof _followUser>(
		makeUser,
		toPipeable<typeof _followUser>(_followUser, params),
	)({ token: refreshToken });

	return send(event, null);
});
