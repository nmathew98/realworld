import type { H3Event } from "h3";
import { getCookie } from "h3";
import { z, zh } from "h3-zod";

import { makeArticle } from "../../entities/article/create";
import { updateArticle } from "../../entities/article/update";
import { makeUser } from "../../entities/user/create";

export default eventHandler(async function createArticle(
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

	const body = await zh.useValidatedBody(
		event,
		z.object({
			article: z.object({
				title: ARTICLE_SCHEMA.title.optional(),
				description: ARTICLE_SCHEMA.description.optional(),
				body: ARTICLE_SCHEMA.body.optional(),
				tagList: ARTICLE_SCHEMA.tagList.optional(),
			}),
		}),
	);

	return toArticleResponse(
		await pipe<typeof makeUser, typeof makeArticle>(
			makeUser,
			toPipeable<typeof updateArticle>(updateArticle, {
				slug: params.slug,
				title: body.article.title,
				body: body.article.body,
				description: body.article.description,
				tagList: body.article.tagList,
			}),
			makeArticle,
		)({ token: refreshToken }),
	);
});
