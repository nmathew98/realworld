import { z } from "h3-zod";

export const USER_SCHEMA = {
	email: z.string().email(),
	password: z.string().min(5).max(12),
	username: z.string(),
	bio: z.string(),
	image: z.string(),
};

export const ARTICLE_SCHEMA = {
	title: z.string(),
	description: z.string(),
	body: z.string(),
	tagList: z.array(z.string()),
};

export const COMMENTS_SCHEMA = {
	body: z.string(),
};
