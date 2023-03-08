import { createRouter } from "h3";

import createArticle from "./create-article";
import deleteArticle from "./delete-article";
import feedArticle from "./feed-article";
import getArticle from "./get-article";
import updateArticle from "./update-article";

export const Articles = createRouter()
	.get("/articles/feed", feedArticle)
	.get("/articles/:slug", getArticle)
	.post("/articles", createArticle)
	.post("/articles/:slug", updateArticle)
	.delete("/articles/:slug", deleteArticle);
