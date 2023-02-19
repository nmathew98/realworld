import { useQuery, useMutation } from "react-query";

export const useArticle = ({ slug }) => {
	const { getArticle: _getArticle } = useContext(UserContext);
	const {
		getComments: _getComments,
		createComment: _createComment,
		deleteComment: _deleteComment,
	} = useContext(CommentContext);

	const queryFnGetArticle = () => _getArticle({ slug })({ body: null });
	const {
		data: article,
		refetch: refetchArticle,
		isLoading: isLoadingGetArticle,
		isRefetching: isRefetchingGetArticle,
		isError: isErrorGetArticle,
		error: errorGetArticles,
	} = useQuery([QUERY_KEYS.Article, slug], queryFnGetArticle);

	const queryFnGetComments = () => _getComments({ slug })({ body: null });
	const {
		data: comments,
		refetch: refetchComments,
		isLoading: isLoadingGetComments,
		isRefetching: isRefetchingGetComments,
		isError: isErrorGetComments,
		error: errorGetComments,
	} = useQuery([QUERY_KEYS.Comments, slug], queryFnGetComments);

	const {
		mutate: createComment,
		isLoading: isLoadingCreateComment,
		isError: isErrorCreateComment,
		error: errorCreateComment,
	} = useMutation(_createComment, {
		// The types don't match but all we need is a reference
		onSuccess: refetchComments as any,
	});

	const {
		mutate: deleteComment,
		isLoading: isLoadingDeleteComment,
		isError: isErrorDeleteComment,
		error: errorDeleteComment,
	} = useMutation(_deleteComment, {
		// The types don't match but all we need is a reference
		onSuccess: refetchComments as any,
	});

	return {
		article,
		comments,
		refetchArticle,
		refetchComments,
		createComment,
		deleteComment,
		isRefetchingGetArticle,
		isRefetchingGetComments,
		isLoadingGetArticle,
		isLoadingGetComments,
		isLoadingCreateComment,
		isLoadingDeleteComment,
		isErrorGetArticle,
		isErrorGetComments,
		isErrorCreateComment,
		isErrorDeleteComment,
		errorGetArticles,
		errorGetComments,
		errorCreateComment,
		errorDeleteComment,
	};
};
