import React from "react";

import type { User } from "../User";

export interface Feed {
	articles: Article[];
	articlesCount: number;
}

export interface Article {
	slug: string;
	title: string;
	description: string;
	body: string;
	tagList: string[];
	createdAt: string;
	updatedAt: string;
	favourited: boolean;
	favouritesCount: number;
	author: User;
}

export const ArticleContext = React.createContext(Object.create(null));

export const ArticleProvider = ({ children }) => {
	const getAllArticles = Resources.Feed.read.articles;
	const getAllArticlesByAuthor = Resources.Feed.read.article;

	const getTags = Resources.Tags.read;

	return (
		<ArticleContext.Provider
			value={{
				getAllArticles,
				getAllArticlesByAuthor,
				getTags,
			}}>
			{children}
		</ArticleContext.Provider>
	);
};
