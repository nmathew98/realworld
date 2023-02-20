import { useQueryClient, useInfiniteQuery } from "react-query";

export const useArticles = ({
	type = ARTICLES_TYPES.Follower,
	articlesPerPage: limit = 10,
	filters,
}) => {
	const queryClient = useQueryClient();
	const matchAccordingToType = makeMatch(type);

	const { isAuthenticated } = useContext(AuthContext);
	const {
		getAllFollowerArticles: _getAllFollowerArticles,
		getAllGlobalArticles: _getAllGlobalArticles,
		transformArticle,
	} = useContext(ArticleContext);

	const [currentPage, setCurrentPage] = useState(1);

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
	const getNextPageParam = (lastPage, allPages) => {
		const totalNumberOfArticlesFetched = transformArticlesData(allPages).length;
		const totalNumberOfArticles = lastPage.articlesCount;

		if (totalNumberOfArticlesFetched < totalNumberOfArticles)
			return allPages.length * limit;

		return undefined;
	};
	const getPreviousPageParam = (firstPage, allPages) => {
		if (allPages.length === 1) return undefined;

		const totalNumberOfArticlesFetched = transformArticlesData(allPages).length;
		const totalNumberOfArticles = firstPage.articlesCount;

		if (totalNumberOfArticlesFetched < totalNumberOfArticles)
			return (allPages.length - 1) * limit;
	};

	const cacheArticles = result =>
		result?.pages?.forEach(page => {
			page.articles.forEach(article => {
				const cached = queryClient.getQueryData([
					QUERY_KEYS.Articles,
					article.slug,
				]);

				if (!cached)
					queryClient.setQueryData(
						[QUERY_KEYS.Articles, article.slug],
						article,
					);
			});
		});
	const transformArticles = result => ({
		...result,
		pages: result.pages.map(page => ({
			...page,
			articles: page.articles.map(transformArticle),
		})),
	});
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
		keepPreviousData: true,
		select: transformArticles,
		onSettled: cacheArticles,
	});

	const makeOnClickNextPage =
		(page = 1) =>
		() => {
			const offset = convertPageToOffset(Math.abs(page), limit);

			if (hasNextPageArticles) {
				fetchNextPageArticles({
					pageParam: offset,
				});

				setCurrentPage(page);
			}
		};

	const makeOnClickPreviousPage =
		(page = 1) =>
		() => {
			const offset = convertPageToOffset(Math.abs(page), limit);

			if (hasPreviousPageArticles) {
				fetchPreviousPageArticles({
					pageParam: offset,
				});

				setCurrentPage(page);
			}
		};

	return {
		currentPage,
		currentPageArticles: transformArticlesData(data?.pages).at(
			convertPageToIndex(currentPage),
		),
		totalNumberOfPages: calculateTotalNumberOfPages(data?.pages, limit),
		totalNumberOfFetchedPages: data?.pages?.length ?? 0,
		makeOnClickNextPage,
		makeOnClickPreviousPage,
		isLoadingArticles,
		isFetchingNextPageArticles,
		isFetchingPreviousPageArticles,
		isErrorArticles,
		errorArticles,
	};
};

const convertPageToIndex = (page: number) => Math.max(page - 1, 0);

const convertPageToOffset = (page: number, limit: number) =>
	Math.max(convertPageToIndex(page) * limit, 0);

const calculateTotalNumberOfPages = (pages, limit) =>
	(pages?.at(0)?.articlesCount ?? 0) / limit;

const transformArticlesData = pages =>
	pages?.map(page => page.articles)?.flat() ?? [];

const makeMatch = buildMakeMatch(
	ARTICLES_TYPES.Follower,
	ARTICLES_TYPES.Global,
);
