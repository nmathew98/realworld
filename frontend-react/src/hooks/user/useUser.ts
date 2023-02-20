import { useMutation, useQueryClient } from "react-query";

export const useUser = () => {
	const queryClient = useQueryClient();
	const {
		createArticle: _createArticle,
		deleteArticle: _deleteArticle,
		updateArticle: _updateArticle,
		favoriteArticle: _favoriteArticle,
		unfavoriteArticle: _unfavoriteArticle,
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

	return {
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
