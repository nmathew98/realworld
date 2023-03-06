import type { H3Event } from "h3";
import { getCookie } from "h3";
import { zh } from "h3-zod";

import { makeArticle } from "../../entities/article/create";
import { makeUser } from "../../entities/user/create";

export default eventHandler(async function getArticle(
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

	return toArticleResponse(
		await pipe<typeof makeUser, typeof makeArticle>(
			makeUser,
			toPipeable<typeof makeArticle>(makeArticle, params),
		)({ token: refreshToken }),
	);
});
