import type { H3Event } from "h3";
import { zh, z } from "h3-zod";

import getProfile from "../profiles/get-profile";

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
			getProfile,
		)({
			event,
			body,
		}),
	);
});
