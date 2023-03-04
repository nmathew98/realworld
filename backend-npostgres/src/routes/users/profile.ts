import type { H3Event } from "h3";
import { getCookie } from "h3";

import { makeUser } from "../../entities/user/create";
import { getProfile } from "../../entities/user/read";

export default eventHandler(async function profile(
	this: Context,
	event: H3Event,
) {
	const refreshToken = getCookie(
		event,
		AUTHENTICATION_COOKIE_KEYS.RefreshToken,
	);

	return toProfileResponse(
		await pipe(makeUser, getProfile)({ token: refreshToken }),
	);
});
