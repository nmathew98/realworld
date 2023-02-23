import { useQueryClient, useInfiniteQuery } from "react-query";
import { minutesToMilliseconds } from "date-fns";

import { usePreviousValueEffect } from "../usePreviousValueEffect";

export const useArticles = ({
	type = ARTICLES_TYPES.Global,
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

	const [currentPage, setCurrentPage] = useState(
		convertOffsetToPage(Number(filters.offset), limit),
	);

	const _getAllArticles = matchAccordingToType(
		_getAllFollowerArticles,
		_getAllGlobalArticles,
	);
	// Because we are also setting the offset in the URL
	// We don't need `pageParam` or `filters`
	const queryFnGetAllArticles = async () => {
		const url = new URL(window.location.href);
		const searchParams = Object.fromEntries(url.searchParams);

		const offset = Number(searchParams.offset || 0);

		const result = await _getAllArticles({
			...searchParams,
			offset,
			limit,
		})({ body: null });

		return {
			page: convertOffsetToPage(offset, limit),
			...result,
		};
	};
	const getNextPageParam = (lastPage, allPages) => {
		const currentPage = lastPage.page;
		const totalNumberOfPages = calculateTotalNumberOfPages(lastPage, limit);

		if (currentPage === totalNumberOfPages) return undefined;

		return allPages.length * limit;
	};
	const getPreviousPageParam = (_, allPages) => {
		if (allPages.length === 1) return undefined;

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
					queryClient.setQueryData([QUERY_KEYS.Article, article.slug], article);
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
		refetch: refetchArticles,
		isLoading: isLoadingArticles,
		isRefetching: isRefetchingArticles,
		isFetchingNextPage: isFetchingNextPageArticles,
		isFetchingPreviousPage: isFetchingPreviousPageArticles,
		fetchNextPage: fetchNextPageArticles,
		fetchPreviousPage: fetchPreviousPageArticles,
		isError: isErrorArticles,
		error: errorArticles,
	} = useInfiniteQuery([QUERY_KEYS.Articles, type], queryFnGetAllArticles, {
		refetchInterval: minutesToMilliseconds(2.5),
		refetchIntervalInBackground: true,
		refetchOnWindowFocus: false,
		getNextPageParam,
		getPreviousPageParam,
		enabled: matchAccordingToType(isAuthenticated, true),
		select: transformArticles,
		onSettled: cacheArticles,
	});

	// Pushing the history because we don't want a reload
	const appendSearchParam = (params: Record<string, any>) => {
		const url = new URL(window.location.href);

		Object.entries(params).forEach(([key, value]) => {
			url.searchParams.set(key, value);
		});

		window.history.pushState(null, "", url.toString());
	};

	const onClickNextPage = async (page: number) => {
		const offset = convertPageToOffset(Math.abs(page), limit);

		appendSearchParam({ offset });

		await fetchNextPageArticles({
			pageParam: offset,
		});

		setCurrentPage(page);
	};

	const onClickPreviousPage = async (page: number) => {
		const offset = convertPageToOffset(Math.abs(page), limit);

		appendSearchParam({ offset });

		await fetchPreviousPageArticles({
			pageParam: offset,
		});

		setCurrentPage(page);
	};

	const makeOnClickPaginationItem = (page: number) => () => {
		if (page > currentPage) {
			onClickNextPage(page);
		} else {
			onClickPreviousPage(page);
		}
	};

	usePreviousValueEffect((from, to) => {
		if (from.tag !== to.tag) {
			setCurrentPage(1);
			appendSearchParam({ offset: 0 });
			refetchArticles();
		}

		if (from.favorited !== to.favorited || from.author !== to.author)
			refetchArticles();
	}, filters);

	usePreviousValueEffect((from, to) => {
		if (from !== to) refetchArticles();
	}, type);

	return {
		currentPage,
		currentPageArticles: transformArticlesData(data?.pages, currentPage),
		makeOnClickPaginationItem,
		totalNumberOfPages: calculateTotalNumberOfPages(data?.pages?.at(0), limit),
		totalNumberOfFetchedPages: data?.pages?.length ?? 0,
		refetchArticles,
		isLoadingArticles: isLoadingArticles,
		isRefetchingArticles: isRefetchingArticles,
		isChangingPageArticles:
			isFetchingNextPageArticles || isFetchingPreviousPageArticles,
		isErrorArticles,
		errorArticles,
	};
};

const convertOffsetToPage = (offset: number, limit: number) =>
	Math.max(offset / limit + 1, 0) || 1;

const convertPageToIndex = (page: number) => Math.max(page - 1, 0);

const convertPageToOffset = (page: number, limit: number) =>
	Math.max(convertPageToIndex(page) * limit, 0);

const calculateTotalNumberOfPages = (page, limit) =>
	Math.ceil((page?.articlesCount ?? 0) / limit);

const transformArticlesData = (pages, currentPage) =>
	pages?.find(item => item.page === currentPage)?.articles ?? [];

const makeMatch = buildMakeMatch(
	ARTICLES_TYPES.Follower,
	ARTICLES_TYPES.Global,
);
