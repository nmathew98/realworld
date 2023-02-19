import { useQuery } from "react-query";

export const useTags = () => {
	const { getTags } = useContext(ArticleContext);

	const queryFnGetTags = () => getTags({ body: null });
	const { data, isLoading, isRefetching, isError, error } = useQuery(
		QUERY_KEYS.Tags,
		queryFnGetTags,
	);

	return {
		tags: data,
		isLoadingTags: isLoading,
		isRefetchingTags: isRefetching,
		isErrorTags: isError,
		errorTags: error,
	};
};
