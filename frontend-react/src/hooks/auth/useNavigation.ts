export const useNavigation = () => {
	const { profile } = useContext(UserContext);
	const [allowedRoutes, setAllowedRoutes] = useState<
		Record<string, any>[] | null
	>(null);
	const [articleTabs, setArticleTabs] = useState<Record<string, any>[] | null>(
		null,
	);

	const isRouteActive = item => window.location.pathname === item.href;

	useEffect(() => {
		if (!profile) {
			setAllowedRoutes(unauthenticatedRoutes);
			setArticleTabs(unauthenticatedArticleTabs);
		} else {
			setAllowedRoutes(
				authenticatedRoutes.concat(createAvatarRoute(profile.username)),
			);
			setArticleTabs(authenticatedArticleTabs);
		}
	}, [profile]);

	return {
		homeHref: `/?offset=0${ARTICLES_TYPES_HASH[ARTICLES_TYPES.Global]}`,
		articleTabs,
		allowedRoutes,
		isRouteActive,
	};
};

export const createProfileArticleTab = (
	username: string,
	searchParams: URLSearchParams,
) => {
	const myArticlesParams = new URLSearchParams({
		author: username,
	});
	const favoritedArticlesParams = new URLSearchParams({
		favorited: username,
	});

	return [
		{
			title: "My Articles",
			href: `/profile/@${username}/?${myArticlesParams.toString()}${
				ARTICLES_TYPES_HASH[ARTICLES_TYPES.Global]
			}`,
			hash: ARTICLES_TYPES_HASH[ARTICLES_TYPES.Global],
			isActive: !searchParams.has("favorited"),
		},
		{
			title: "Favorited Articles",
			href: `/profile/@${username}/?${favoritedArticlesParams.toString()}${
				ARTICLES_TYPES_HASH[ARTICLES_TYPES.Global]
			}`,
			hash: ARTICLES_TYPES_HASH[ARTICLES_TYPES.Global],
			isActive: searchParams.has("favorited"),
		},
	];
};

const authenticatedRoutes = [
	{
		title: "Home",
		href: "/",
	},
	{
		title: "New Post",
		href: "/new-post",
		icon: "ion-compose",
	},
	{
		title: "Settings",
		href: "/settings",
		icon: "ion-gear-a",
	},
];

const createAvatarRoute = (username: string) => {
	const myArticlesParams = new URLSearchParams({
		author: username,
	});

	return {
		title: username,
		href: `/profile/@${username}/?${myArticlesParams.toString()}${
			ARTICLES_TYPES_HASH[ARTICLES_TYPES.Global]
		}`,
		avatar: "https://api.realworld.io/images/smiley-cyrus.jpeg",
		username: username,
	};
};

const unauthenticatedRoutes = [
	{
		title: "Home",
		href: "/",
	},
	{
		title: "Sign in",
		href: "/login",
	},
	{
		title: "Sign up",
		href: "/register",
	},
];

const unauthenticatedArticleTabs = [
	{
		title: "Global Feed",
		href: `/?offset=0${ARTICLES_TYPES_HASH[ARTICLES_TYPES.Global]}`,
		hash: ARTICLES_TYPES_HASH[ARTICLES_TYPES.Global],
	},
];

const authenticatedArticleTabs: ArticleTab[] = [
	{
		title: "Global Feed",
		href: `/?offset=0${ARTICLES_TYPES_HASH[ARTICLES_TYPES.Global]}`,
		hash: ARTICLES_TYPES_HASH[ARTICLES_TYPES.Global],
	},
	{
		title: "Your Feed",
		href: `/?offset=0${ARTICLES_TYPES_HASH[ARTICLES_TYPES.Follower]}`,
		hash: ARTICLES_TYPES_HASH[ARTICLES_TYPES.Follower],
	},
];

interface ArticleTab {
	title: string;
	href: string;
	hash?: string;
}
