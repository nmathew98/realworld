import { createRouter } from "h3";

import createArticle from "./create-article";
import getArticle from "./get-article";
import updateArticle from "./update-article";

export const Articles = createRouter()
	.get("/articles/:slug", getArticle)
	.post("/articles", createArticle)
	.post("/articles/:slug", updateArticle);
