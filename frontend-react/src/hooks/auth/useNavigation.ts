export const useNavigation = () => {
	const { activeUser, isAuthenticated } = useContext(AuthContext);
	const [allowedRoutes, setAllowedRoutes] = useState<Record<string, any>[]>([]);
	const [articleTabs, setArticleTabs] = useState<Record<string, any>[]>([]);

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
		{
			title: activeUser.username,
			href: `/@${activeUser.username}`,
			avatar: "https://api.realworld.io/images/smiley-cyrus.jpeg",
			username: activeUser.username,
		},
	];

	const isRouteActive = item => window.location.pathname === item.href;

	useEffect(() => {
		if (!isAuthenticated) {
			setAllowedRoutes(unauthenticatedRoutes);
			setArticleTabs(unauthenticatedArticleTabs);
		} else {
			setAllowedRoutes(authenticatedRoutes);
			setArticleTabs(authenticatedArticleTabs);
		}
	}, [isAuthenticated]);

	return {
		articleTabs,
		allowedRoutes,
		isRouteActive,
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
	},
];

const authenticatedArticleTabs = [
	{
		title: "Your Feed",
	},
	{
		title: "Global Feed",
	},
];
