import React from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";

export interface User {
	username: string;
	bio: string;
	image: string;
	following: boolean;
}

export const UserContext = React.createContext(Object.create(null));

export const UserProvider = ({ children }) => {
	const queryClient = useQueryClient();
	const { onAuthenticationError, isAuthenticated } = useContext(AuthContext);

	const getProfile = async () => {
		const currentUser = await Resources.User.read.current({ body: null });

		return Resources.User.read.username({
			username: currentUser.username,
		})({ body: null });
	};

	const { data: profile, refetch: refetchProfile } = useQuery(
		QUERY_KEYS.CurrentUser,
		getProfile,
		{
			refetchOnWindowFocus: false,
			onError: onAuthenticationError,
			enabled: isAuthenticated,
		},
	);

	const updateProfile = useMutation(Resources.User.update.profile, {
		onSuccess: () => {
			queryClient.invalidateQueries(QUERY_KEYS.CurrentUser);
			refetchProfile();
		},
	});

	const followUser = useCallback(
		({ username }) =>
			Resources.User.update.follow({ username })({ body: null }),
		[],
	);

	const unfollowUser = useCallback(
		({ username }) =>
			Resources.User.update.unfollow({ username })({ body: null }),
		[],
	);

	const getArticle = Resources.Articles.read.single;

	const createArticle = Resources.Articles.create;
	const updateArticle = Resources.Articles.update.article;
	const favoriteArticle = Resources.Articles.update.favorite;
	const deleteArticle = Resources.Articles.delete.article;
	const unfavoriteArticle = Resources.Articles.delete.favorite;

	return (
		<UserContext.Provider
			value={{
				profile,
				refetchProfile,
				updateProfile,
				followUser,
				unfollowUser,
				createArticle,
				getArticle,
				updateArticle,
				favoriteArticle,
				deleteArticle,
				unfavoriteArticle,
			}}>
			{children}
		</UserContext.Provider>
	);
};
