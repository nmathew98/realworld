import { createRouter } from "h3";

import createArticle from "./create-article";
import getArticle from "./get-article";

export const Articles = createRouter()
	.get("/articles/:slug", getArticle)
	.post("/articles", createArticle);
