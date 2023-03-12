import type { Document, WithId } from "mongodb";
import { formatISO } from "date-fns";

import type { Tag } from "./tag";
import type { User } from "./user";

export type Article = ReturnType<typeof toArticleDocument>;
export const toArticleDocument = (doc: WithId<Document>) => ({
	_id: doc._id?.toString() || null,
	slug: doc.slug ?? toSlug(doc.title),
	author: (doc.author._id ?? doc.author) || null,
	title: doc.title || null,
	description: doc.description || null,
	favorites: doc.favorites || 0,
	body: doc.body || null,
	createdAt: doc.createdAt ?? Date.now(),
	updatedAt: Date.now(),
});

export const toArticleResponse = (
	article: Article,
	tags: Tag[],
	author: User,
	currentUser: User,
) => ({
	article: {
		slug: article.slug,
		title: article.title,
		description: article.description,
		body: article.body,
		tagList: tags.map(doc => doc.tag),
		createdAt: article.createdAt ? formatISO(article.createdAt) : null,
		updatedAt: article.updatedAt ? formatISO(article.updatedAt) : null,
		favorited: currentUser.favorites.some(
			favorited => favorited === article._id,
		),
		favoritesCount: article.favorites,
		author: {
			username: author.username,
			bio: author.bio,
			image: author.image,
			following: !!currentUser.follows.some(
				follows => follows._id === author._id,
			),
		},
	},
});

export const toFeedResponse = (
	articles: Article[],
	tags: Tag[][],
	authors: User[],
	currentUser: User,
	articlesCount: number,
) => ({
	articles: articles.map((article, index) =>
		toArticleResponse(
			article,
			tags.at(index) as Tag[],
			authors.at(index) as User,
			currentUser,
		),
	),
	articlesCount,
});

const toSlug = (title: string) => title.toLowerCase().replace(/\s+/g, "-");
