import { useQuery } from "react-query";

const ARTICLES_PER_PAGE = 10;

export const useArticles = ({ type = "global", filters }) => {
	const { isAuthenticated } = useContext(AuthContext);
	const {
		getAllFollowerArticles: _getAllFollowerArticles,
		getAllGlobalArticles: _getAllGlobalArticles,
	} = useContext(ArticleContext);

	const [totalNumberOfArticles, setTotalNumberOfArticles] = useState(0);
	const [totalNumberOfPages, setTotalNumberOfPages] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);
	const [offset, setOffset] = useState(0);

	const managedFilter = {
		offset,
		...filters,
	};

	const isQueryEnabled = type === "followers" ? isAuthenticated : true;
	const queryFnGetAllGlobalArticles = () =>
		_getAllGlobalArticles(managedFilter)({ body: null });

	const nextPage = (numberOfPages = 1) => {
		if (currentPage < totalNumberOfPages) {
			setOffset(
				Math.min(
					offset - numberOfPages * ARTICLES_PER_PAGE,
					totalNumberOfArticles,
				),
			);

			setCurrentPage(Math.min(currentPage + 1, totalNumberOfPages));
		}
	};

	const previousPage = (numberOfPages = 1) => {
		if (currentPage > 1) {
			setOffset(Math.max(offset - numberOfPages * ARTICLES_PER_PAGE, 0));

			setCurrentPage(Math.max(currentPage - 1, 1));
		}
	};

	const onSuccess = () => {
		setOffset(offset + 10);
	};
	const {
		data: followerArticles,
		refetch: refetchFollowerArticles,
		isLoading: isLoadingFollowerArticles,
		isRefetching: isRefetchingFollowerArticles,
		isError: isErrorFollowerArticles,
		error: errorFollowerArticles,
	} = useQuery(
		[QUERY_KEYS.Articles, "followers"],
		queryFnGetAllGlobalArticles,
		{
			enabled: isQueryEnabled,
			onSuccess,
		},
	);

	const queryFnGetAllFollowerArticles = () =>
		_getAllFollowerArticles(managedFilter)({ body: null });
	const {
		data: globalArticles,
		refetch: refetchGlobalArticles,
		isLoading: isLoadingGlobalArticles,
		isRefetching: isRefetchingGlobalArticles,
		isError: isErrorGlobalArticles,
		error: errorGlobalArticles,
	} = useQuery([QUERY_KEYS.Articles, "global"], queryFnGetAllFollowerArticles, {
		enabled: isQueryEnabled,
		onSuccess,
	});

	useEffect(() => {
		refetchFollowerArticles();
		refetchGlobalArticles();
	}, [offset]);

	// If the `type` changes we want to go back to the first page
	useEffect(() => {
		setOffset(10);
		setCurrentPage(1);
	}, [type]);

	const calculateTotalNumberOfPages = result =>
		Math.ceil(Number(result.articlesCount) / 10);
	useEffect(() => {
		if (type === "followers" && followerArticles) {
			setTotalNumberOfArticles(followerArticles.articlesCount);
			setTotalNumberOfPages(calculateTotalNumberOfPages(followerArticles));
		} else if (type === "global" && globalArticles) {
			setTotalNumberOfArticles(globalArticles.articlesCount);
			setTotalNumberOfPages(calculateTotalNumberOfPages(globalArticles));
		}
	}, [type, followerArticles, globalArticles]);

	return {
		articles: type === "followers" ? followerArticles : globalArticles,
		articlesCount:
			type === "followers"
				? followerArticles?.articlesCount
				: globalArticles?.articlesCount,
		currentPage,
		nextPage,
		previousPage,
		isLoadingArticles:
			type === "followers"
				? isLoadingFollowerArticles
				: isLoadingGlobalArticles,
		isRefetchingArticles:
			type === "followers"
				? isRefetchingFollowerArticles
				: isRefetchingGlobalArticles,
		isErrorArticles:
			type === "followers" ? isErrorFollowerArticles : isErrorGlobalArticles,
		errorArticles:
			type === "followers" ? errorFollowerArticles : errorGlobalArticles,
	};
};
