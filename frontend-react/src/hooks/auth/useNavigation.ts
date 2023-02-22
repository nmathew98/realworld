export const useNavigation = () => {
	const { activeUser, isAuthenticated } = useContext(AuthContext);
	const [allowedRoutes, setAllowedRoutes] = useState<
		Record<string, any>[] | null
	>(null);
	const [articleTabs, setArticleTabs] = useState<Record<string, any>[] | null>(
		null,
	);

	const isRouteActive = item => window.location.pathname === item.href;

	useEffect(() => {
		if (!isAuthenticated) {
			setAllowedRoutes(unauthenticatedRoutes);
			setArticleTabs(unauthenticatedArticleTabs);
		} else {
			setAllowedRoutes(authenticatedRoutes);
			setArticleTabs(
				authenticatedArticleTabs.concat(createAvatarRoute(activeUser.username)),
			);
		}
	}, [isAuthenticated]);

	return {
		homeHref: isAuthenticated
			? `/${ARTICLES_TYPES_HASH[ARTICLES_TYPES.Follower]}`
			: `/${ARTICLES_TYPES_HASH[ARTICLES_TYPES.Global]}`,
		articleTabs,
		allowedRoutes,
		isRouteActive,
	};
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

const createAvatarRoute = (username: string) => ({
	title: username,
	href: `/@${username}`,
	avatar: "https://api.realworld.io/images/smiley-cyrus.jpeg",
	username: username,
});

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
		href: `/${ARTICLES_TYPES_HASH[ARTICLES_TYPES.Global]}`,
		hash: ARTICLES_TYPES_HASH[ARTICLES_TYPES.Global],
	},
];

const authenticatedArticleTabs: ArticleTab[] = [
	{
		title: "Your Feed",
		href: `/${ARTICLES_TYPES_HASH[ARTICLES_TYPES.Follower]}`,
		hash: ARTICLES_TYPES_HASH[ARTICLES_TYPES.Follower],
	},
	{
		title: "Global Feed",
		href: `/${ARTICLES_TYPES_HASH[ARTICLES_TYPES.Global]}`,
		hash: ARTICLES_TYPES_HASH[ARTICLES_TYPES.Global],
	},
];

interface ArticleTab {
	title: string;
	href: string;
	hash?: string;
}
