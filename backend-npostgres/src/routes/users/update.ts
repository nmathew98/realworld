import type { H3Event } from "h3";
import { getCookie } from "h3";
import { zh, z } from "h3-zod";

import { makeUser } from "../../entities/user/create";
import { updateUser as _updateUser } from "../../entities/user/update";

export default eventHandler(async function update(
	this: Context,
	event: H3Event,
) {
	const body = await zh.useValidatedBody(
		event,
		z.object({
			user: z.object({
				username: USER_SCHEMA.username.optional(),
				email: USER_SCHEMA.email.optional(),
				password: USER_SCHEMA.password.optional(),
				image: USER_SCHEMA.image.optional(),
				bio: USER_SCHEMA.bio.optional(),
			}),
		}),
	);

	const refreshToken = getCookie(
		event,
		AUTHENTICATION_COOKIE_KEYS.RefreshToken,
	);

	return toUserResponse(
		await pipe<typeof makeUser, typeof _updateUser>(
			makeUser,
			toPipeable<typeof _updateUser>(_updateUser, {
				username: body.user.username,
				email: body.user.email,
				password: body.user.password,
				image: body.user.image,
				bio: body.user.bio,
			}),
		)({ token: refreshToken }),
	);
});
