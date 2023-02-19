import { useQuery } from "react-query";

export const useArticles = ({ type = "global", filters }) => {
	const { isAuthenticated } = useContext(AuthContext);
	const {
		getAllFollowerArticles: _getAllFollowerArticles,
		getAllGlobalArticles: _getAllGlobalArticles,
	} = useContext(ArticleContext);

	const [offset, setOffset] = useState(0);

	const managedFilter = {
		offset,
		...filters,
	};

	const queryFnMap = {
		global: () => _getAllGlobalArticles(managedFilter),
		follower: () => _getAllFollowerArticles(managedFilter),
	};
	const queryFnMapKey = type.toLowerCase();
	const queryFn = queryFnMap[queryFnMapKey];

	const isQueryEnabled = type === "followers" ? isAuthenticated : true;
	const { data, isLoading, isRefetching, isError, error } = useQuery(
		[QUERY_KEYS.Articles, type],
		queryFn,
		{
			enabled: isQueryEnabled,
			onSuccess: (result: any) => {
				setOffset(offset + Number(result.articlesCount));
			},
		},
	);

	return {
		articles: data,
		isLoadingArticles: isLoading,
		isRefetchingArticles: isRefetching,
		isErrorArticles: isError,
		errorArticles: error,
	};
};
