export type Tag = ReturnType<typeof toTagDocument>;
export const toTagDocument = (doc: Record<string, any>) => ({
	_id: doc._id || null,
	tag: doc.tag || null,
	article: (doc.article?._id ?? doc.article) || null,
});

export const toTagsResponse = (tags: Tag[]) => ({
	tags: tags.map(doc => doc.tag),
});
