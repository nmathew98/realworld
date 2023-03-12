import type { Document, WithId } from "mongodb";

import type { Article } from "./article";

export type Tag = ReturnType<typeof toTagDocument>;
export const toTagDocument = (
	doc: WithId<Document> & { article: Article },
) => ({
	_id: doc._id?.toString() || null,
	tag: doc.tag || null,
	article: (doc.article._id ?? doc.article) || null,
});

export const toTagsResponse = (tags: Tag[]) => ({
	tags: tags.map(doc => doc.tag),
});
