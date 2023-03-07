import type { H3Event } from "h3";
import { zh, z } from "h3-zod";

import { getProfile } from "../../entities/user/read";

export default eventHandler(async function registration(
	this: Context,
	event: H3Event,
) {
	const body = await zh.useValidatedBody(
		event,
		z.object({
			user: z.object({
				username: USER_SCHEMA.username,
				email: USER_SCHEMA.email,
				password: USER_SCHEMA.password,
			}),
		}),
	);

	return toUserResponse(
		await pipe<typeof usePassport, typeof getProfile>(
			usePassport,
			toPipeable<typeof getProfile>(getProfile, {
				username: null,
			}),
		)({
			event,
			body,
		}),
	);
});
