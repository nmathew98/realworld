import React from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";

import { AuthContext } from "../Auth";

export interface User {
	username: string;
	bio: string;
	image: string;
	following: boolean;
}

export const UserContext = React.createContext(Object.create(null));

export const UserProvider = ({ children }) => {
	const queryClient = useQueryClient();
	const { status } = useContext(AuthContext);

	const getProfile = Resources.User.read.current;

	const updateProfile = useMutation(Resources.User.update.profile, {
		onSuccess: () => {
			queryClient.invalidateQueries(QUERY_KEYS.CurrentUser);
		},
	});

	const createArticle = Resources.Articles.create;

	const updateArticle = Resources.Articles.update.article;
	const favoriteArticle = Resources.Articles.update.favorite;

	const deleteArticle = Resources.Articles.delete.article;
	const unfavoriteArticle = Resources.Articles.delete.favorite;

	const {
		data: profile,
		error: getProfileError,
		isFetching: isFetchingProfile,
		refetch: refetchProfile,
	} = useQuery(QUERY_KEYS.CurrentUser, () => getProfile({ body: null }), {
		enabled: status === AUTHENTICATION_STATUS.Authenticated,
	});

	return (
		<UserContext.Provider
			value={{
				profile,
				refetchProfile,
				isFetchingProfile,
				getProfileError,
				updateProfile,
				createArticle,
				updateArticle,
				favoriteArticle,
				deleteArticle,
				unfavoriteArticle,
			}}>
			{children}
		</UserContext.Provider>
	);
};
