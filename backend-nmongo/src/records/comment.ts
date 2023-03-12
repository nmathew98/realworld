import type { Document, WithId } from "mongodb";
import { formatISO } from "date-fns";

import type { User } from "./user";
import type { Article } from "./article";

export type Comment = ReturnType<typeof toCommentDocument>;
export const toCommentDocument = (
	doc: WithId<Document> & { author: User | string; article: Article | string },
) => ({
	_id: doc._id?.toString() || null,
	author: ((doc.author as User)._id ?? doc.author) || null,
	article: ((doc.article as Article)._id ?? doc.article) || null,
	body: doc.body || null,
	createdAt: doc.createdAt ?? Date.now(),
	updatedAt: Date.now(),
});

export const toCommentResponse = (
	comment: Comment,
	author: User,
	currentUser: User,
) => ({
	comment: {
		id: comment._id,
		createdAt: comment.createdAt ? formatISO(comment.createdAt) : null,
		updatedAt: comment.updatedAt ? formatISO(comment.updatedAt) : null,
		body: comment.body,
		author: {
			username: author.username,
			bio: author.bio,
			image: author.image,
			following: !!currentUser.follows.some(follows => follows === author._id),
		},
	},
});

export const toCommentsResponse = (
	comments: Comment[],
	authors: User[],
	currentUser: User,
) => ({
	comments: comments.map(
		(comment, index) =>
			toCommentResponse(comment, authors.at(index) as User, currentUser)
				.comment,
	),
});