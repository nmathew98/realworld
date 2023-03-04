import type { H3Event } from "h3";
import { zh, z } from "h3-zod";

import { passport } from "../middleware/passport";

export async function login(this: Context, event: H3Event) {
	await zh.useValidatedBody(
		event,
		z.object({
			user: z.object({
				email: USER_SCHEMA.email,
				password: USER_SCHEMA.password,
			}),
		}),
	);

	try {
		const user = (await passport(event)) as InstanceType<typeof User>;

		return toUserResponse(user);
	} catch (error: any) {
		return sendError(event, error);
	}
}
