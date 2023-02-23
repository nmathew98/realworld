export const lisbon = () => {
	const { isAuthenticated } = useContext(AuthContext);

	return {
		redirect: !isAuthenticated,
		to: "/login",
	};
};

export const cho = () => {
	const { isAuthenticated } = useContext(AuthContext);

	return {
		redirect: isAuthenticated,
		to: "/#global",
	};
};

export const rigsby = from => {
	/* eslint-disable */
	const url = new URL(from);

	url.pathname = "/login";
	url.searchParams.set("hello", "world");

	console.log(url);

	// Check that hashes are valid, search params are valid
	return {
		redirect: true,
	};
};

export const grace = () => {
	// Check metrics
	const start = Date.now();

	useEffect(() => {
		/* eslint-disable */
		console.info(`Start: ${start}`);

		return () => {
			const end = Date.now();

			if (end - start > 1000) {
				console.info(`End: ${end}`);
				console.info(`Time at page: ${end - start}`);
			}
		};
	}, []);
};
