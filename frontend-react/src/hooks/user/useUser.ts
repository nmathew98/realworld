import { useQuery, useMutation, useQueryClient } from "react-query";

export const useUser = ({ username }) => {
	const queryClient = useQueryClient();
	const { isAuthenticated } = useContext(AuthContext);
	const {
		createArticle: _createArticle,
		deleteArticle: _deleteArticle,
		updateArticle: _updateArticle,
		favoriteArticle: _favoriteArticle,
		unfavoriteArticle: _unfavoriteArticle,
		followUser: _followUser,
		unfollowUser: _unfollowUser,
	} = useContext(UserContext);

	const {
		mutate: createArticle,
		isLoading: isLoadingCreateArticle,
		isError: isErrorCreateArticle,
		error: errorCreateArticle,
	} = useMutation(_createArticle);

	const onArticleMutated = (_, { slug }) => {
		queryClient.invalidateQueries([QUERY_KEYS.Article, slug]);
		queryClient.invalidateQueries([QUERY_KEYS.Articles, ARTICLES_TYPES.Global]);
	};
	const {
		mutate: deleteArticle,
		isLoading: isLoadingDeleteArticle,
		isError: isErrorDeleteArticle,
		error: errorDeleteArticle,
	} = useMutation(_deleteArticle, {
		onSuccess: onArticleMutated,
	});
	const {
		mutate: updateArticle,
		isLoading: isLoadingUpdateArticle,
		isError: isErrorUpdateArticle,
		error: errorUpdateArticle,
	} = useMutation(_updateArticle, {
		onSuccess: onArticleMutated,
	});
	const {
		mutate: favoriteArticle,
		isLoading: isLoadingFavoriteArticle,
		isError: isErrorFavoriteArticle,
		error: errorFavoriteArticle,
	} = useMutation(_favoriteArticle, {
		onSuccess: onArticleMutated,
	});
	const {
		mutate: unfavoriteArticle,
		isLoading: isLoadingUnfavoriteArticle,
		isError: isErrorUnfavoriteArticle,
		error: errorUnfavoriteArticle,
	} = useMutation(_unfavoriteArticle, {
		onSuccess: onArticleMutated,
	});

	const { mutate: followUser } = useMutation<any, any, any>(_followUser);
	const { mutate: unfollowUser } = useMutation<any, any, any>(_unfollowUser);

	const queryFnGetProfile = () =>
		Resources.User.read.username({ username })({ body: null });
	const { data: profile, refetch: refetchProfile } = useQuery(
		[QUERY_KEYS.Profile, username],
		queryFnGetProfile,
		{
			enabled: isAuthenticated && username,
		},
	);

	const makeOnClickFollow = (username: string) => () => {
		if (profile.following) unfollowUser({ username });
		else followUser({ username });

		refetchProfile();
	};

	return {
		profile,
		makeOnClickFollow,
		createArticle,
		deleteArticle,
		updateArticle,
		favoriteArticle,
		unfavoriteArticle,
		isLoadingCreateArticle,
		isLoadingDeleteArticle,
		isLoadingUpdateArticle,
		isLoadingFavoriteArticle,
		isLoadingUnfavoriteArticle,
		isErrorCreateArticle,
		isErrorDeleteArticle,
		isErrorUpdateArticle,
		isErrorFavoriteArticle,
		isErrorUnfavoriteArticle,
		errorCreateArticle,
		errorDeleteArticle,
		errorUpdateArticle,
		errorFavoriteArticle,
		errorUnfavoriteArticle,
	};
};
