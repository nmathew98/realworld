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

// When this loads its always before `isAuthenticated` is determined
// so it always comes out as global
export const ifIncorrectParams = from => {
	const validHashes = [
		ARTICLES_TYPES_HASH[ARTICLES_TYPES.Follower],
		ARTICLES_TYPES_HASH[ARTICLES_TYPES.Global],
	];

	if (!validHashes.includes(from.hash)) {
		return {
			redirect: true,
			to: `/?offset=0#global`,
		};
	}

	const searchParams = [...from.searchParams.keys()];

	const validSearchParams = ["tag", "author", "favorited", "limit", "offset"];

	if (
		searchParams.filter(param => !validSearchParams.includes(param)).length > 0
	) {
		return {
			redirect: true,
			to: `/?offset=0#global`,
		};
	}
};
