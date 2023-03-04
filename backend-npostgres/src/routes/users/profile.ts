import type { H3Event } from "h3";
import { getCookie } from "h3";

import { makeUser } from "../../entities/user/create";
import { getProfile } from "../../entities/user/read";

export async function profile(this: Context, event: H3Event) {
	const refreshToken = getCookie(event, "refresh");

	return toProfileResponse(
		await pipe(makeUser, getProfile, pop)({ token: refreshToken }),
	);
}
