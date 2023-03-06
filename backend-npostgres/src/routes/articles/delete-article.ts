import type { H3Event } from "h3";
import { getCookie, send } from "h3";
import { zh } from "h3-zod";

import { makeArticle } from "../../entities/article/create";
import { makeUser } from "../../entities/user/create";
import { deleteArticle as _deleteArticle } from "../../entities/article/delete";

export default eventHandler(async function deleteArticle(
	this: Context,
	event: H3Event,
) {
	const refreshToken = getCookie(
		event,
		AUTHENTICATION_COOKIE_KEYS.RefreshToken,
	);

	const params = (await zh.useValidatedParams(event, {
		slug: ARTICLE_SCHEMA.slug,
	})) as { slug: string };

	await pipe<typeof makeUser, typeof makeArticle>(
		makeUser,
		toPipeable<typeof _deleteArticle>(_deleteArticle, params),
	)({ token: refreshToken });

	return send(event, null);
});
