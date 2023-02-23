export const ifUnauthenticated = () => {
	const { isAuthenticated } = useContext(AuthContext);

	return {
		redirect: !isAuthenticated,
		to: "/login",
	};
};

export const ifAuthenticated = () => {
	const { isAuthenticated } = useContext(AuthContext);

	const followerHash = ARTICLES_TYPES_HASH[ARTICLES_TYPES.Follower];
	const globalHash = ARTICLES_TYPES_HASH[ARTICLES_TYPES.Global];

	return {
		redirect: isAuthenticated,
		to: `/?offset=0${isAuthenticated ? followerHash : globalHash}`,
	};
};

export const ifIncorrectLocation = from => {
	const { isAuthenticated } = useContext(AuthContext);

	const validHashes = [
		ARTICLES_TYPES_HASH[ARTICLES_TYPES.Follower],
		ARTICLES_TYPES_HASH[ARTICLES_TYPES.Global],
	];

	const isHashValid = validHashes.includes(from.hash);

	const searchParams = [...from.searchParams.keys()];
	const validSearchParams = ["tag", "author", "favorited", "limit", "offset"];

	const isSearchParamsInvalid =
		searchParams.filter(param => !validSearchParams.includes(param)).length > 0;

	useEffect(() => {
		if (isAuthenticated) window.location.hash = validHashes.at(0) as string;
	}, [isAuthenticated]);

	return {
		redirect: !isHashValid || isSearchParamsInvalid,
		to: `/?offset=0${isAuthenticated ? validHashes.at(0) : validHashes.at(1)}`,
	};
};
