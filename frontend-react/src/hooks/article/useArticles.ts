import { useInfiniteQuery } from "react-query";

export const useArticles = ({
	type = ARTICLES_TYPES.Follower,
	articlesPerPage: limit = 10,
	filters,
}) => {
	const matchAccordingToType = makeMatch(type);

	const { isAuthenticated } = useContext(AuthContext);
	const {
		getAllFollowerArticles: _getAllFollowerArticles,
		getAllGlobalArticles: _getAllGlobalArticles,
	} = useContext(ArticleContext);

	const [offset, setOffset] = useState(0);

	const _getAllArticles = matchAccordingToType(
		_getAllFollowerArticles,
		_getAllGlobalArticles,
	);
	const queryFnGetAllArticles = ({ pageParam: offset = 0 }) =>
		_getAllArticles({
			...filters,
			limit,
			offset,
		})({ body: null });
	const getNextPageParam = lastPage => {
		const totalNumberOfArticles = lastPage.articlesCount;

		if (offset < totalNumberOfArticles) {
			const pageParam = Math.min(offset + limit, totalNumberOfArticles);

			setOffset(pageParam);

			return pageParam;
		}
	};
	const getPreviousPageParam = () => {
		if (offset > limit) {
			const pageParam = Math.max(offset - limit, 0);

			setOffset(pageParam);

			return pageParam;
		}
	};

	const {
		data,
		isLoading: isLoadingArticles,
		isFetchingNextPage: isFetchingNextPageArticles,
		isFetchingPreviousPage: isFetchingPreviousPageArticles,
		fetchNextPage: fetchNextPageArticles,
		fetchPreviousPage: fetchPreviousPageArticles,
		hasNextPage: hasNextPageArticles,
		hasPreviousPage: hasPreviousPageArticles,
		isError: isErrorArticles,
		error: errorArticles,
	} = useInfiniteQuery([QUERY_KEYS.Articles, type], queryFnGetAllArticles, {
		getNextPageParam,
		getPreviousPageParam,
		enabled: matchAccordingToType(isAuthenticated, true),
	});

	return {
		articles: transformArticlesData(data),
		currentPage: offset / limit + 1,
		totalNumberOfPages: calculateTotalNumberOfPages(data, limit),
		totalNumberOfFetchedPages: data?.pages?.length ?? 0,
		fetchNextPageArticles,
		fetchPreviousPageArticles,
		isLoadingArticles,
		isFetchingNextPageArticles,
		isFetchingPreviousPageArticles,
		hasNextPageArticles,
		hasPreviousPageArticles,
		isErrorArticles,
		errorArticles,
	};
};

const calculateTotalNumberOfPages = (data, limit) =>
	(data?.pages?.at(0)?.articlesCount ?? 0) / limit;

const transformArticlesData = data =>
	data?.pages?.map(page => page.articles)?.flat() ?? [];

const makeMatch = buildMakeMatch(
	ARTICLES_TYPES.Follower,
	ARTICLES_TYPES.Global,
);
