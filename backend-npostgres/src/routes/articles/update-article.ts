import type { H3Event } from "h3";
import { getCookie } from "h3";
import { z, zh } from "h3-zod";

import { makeArticle } from "../../entities/article/create";
import { updateArticle } from "../../entities/article/update";
import { makeTag } from "../../entities/tag/create";
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

	const updates = {
		title: body.article.title,
		body: body.article.body,
		description: body.article.description,
		tagList: body.article.tagList,
	};

	if (Object.keys(updates).length === 0)
		return toArticleResponse(
			await pipe<typeof makeUser, typeof makeArticle>(
				makeUser,
				toPipeable<typeof makeArticle>(makeArticle, params),
			)({ token: refreshToken }),
		);

	return toArticleResponse(
		await pipe<typeof makeUser, typeof makeArticle>(
			makeUser,
			toPipeable<typeof updateArticle>(updateArticle, {
				slug: params.slug,
				...updates,
			}),
			toPipeable<typeof makeTag>(makeTag),
			toPipeable<typeof makeArticle>(makeArticle, undefined),
		)({ token: refreshToken }),
	);
});
