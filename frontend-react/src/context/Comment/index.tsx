import React from "react";

import type { User } from "../User";

export interface Comment {
	id: number;
	createdAt: string;
	updatedAt: string;
	body: string;
	author: User;
}

export const CommentContext = React.createContext(Object.create(null));

export const CommentProvider = ({ children }) => {
	const getComments = Resources.Comments.read;
	const createComment = Resources.Comments.create;
	const deleteComment = Resources.Comments.delete;

	return (
		<CommentContext.Provider
			value={{
				getComments,
				createComment,
				deleteComment,
			}}>
			{children}
		</CommentContext.Provider>
	);
};
