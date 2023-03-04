import type { H3Event } from "h3";
import { getCookie } from "h3";

import type { Collection } from "../../utilities/pipe";
import { makeUser } from "../../entities/user/create";
import { getProfile as _getProfile } from "../../entities/user/read";
import { zh } from "h3-zod";

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

	const getProfile = (...records: Collection[]) =>
		_getProfile.call(this, { username: params.username }, ...records);

	return toProfileResponse(
		await pipe(makeUser, getProfile)({ token: refreshToken }),
	);
});
