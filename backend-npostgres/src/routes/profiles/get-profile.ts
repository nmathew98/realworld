import type { H3Event } from "h3";
import { getCookie } from "h3";
import { zh } from "h3-zod";

import { makeUser } from "../../entities/user/create";
import { getProfile as _getProfile } from "../../entities/user/read";

export default eventHandler(async function getProfile(
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

	if (!refreshToken)
		return toProfileResponse(await _getProfile.call(this, params));

	return toProfileResponse(
		await pipe<typeof makeUser, typeof _getProfile>(
			makeUser,
			toPipeable<typeof _getProfile>(_getProfile, params),
		)({ token: refreshToken }),
	);
});
