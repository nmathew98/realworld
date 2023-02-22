import { Title } from "react-head";
import { Link, useSearchParams } from "react-router-dom";

import { Articles } from "../../components/Article";
import { LayoutProfile } from "../../layouts/Profile";
import { ArticleTabContainer } from "../../components/Article/Tab/Container";
import { ArticleTabItem } from "../../components/Article/Tab/Item";

export const Profile = () => (
	<LayoutProfile>
		<Body />
	</LayoutProfile>
);

const Body = () => {
	const { profile } = useContext(UserContext);

	return (
		<>
			<Title>{profile?.username} - Conduit</Title>
			<ArticleNavigation username={profile?.username} />
			<Articles />
		</>
	);
};

const ArticleNavigation = ({ username }) => {
	const [searchParams] = useSearchParams();

	const myArticlesParams = new URLSearchParams({
		author: username,
	});
	const favoritedArticlesParams = new URLSearchParams({
		favorited: username,
	});

	const authenticatedArticleTabs = useMemo(
		() => [
			{
				title: "My Articles",
				href: `/@${username}/?${myArticlesParams.toString()}${
					ARTICLES_TYPES_HASH[ARTICLES_TYPES.Global]
				}`,
				hash: ARTICLES_TYPES_HASH[ARTICLES_TYPES.Global],
				isActive: !searchParams.has("favorited"),
			},
			{
				title: "Favorited Articles",
				href: `/@${username}/?${favoritedArticlesParams.toString()}${
					ARTICLES_TYPES_HASH[ARTICLES_TYPES.Global]
				}`,
				hash: ARTICLES_TYPES_HASH[ARTICLES_TYPES.Global],
				isActive: searchParams.has("favorited"),
			},
		],
		[searchParams, username],
	);

	if (!username) return null;

	return (
		<ArticleTabContainer>
			{authenticatedArticleTabs?.map((item, index) => (
				<ArticleTabItem
					key={index}
					as={Link}
					to={item.href}
					isActive={item.isActive}>
					{item.title}
				</ArticleTabItem>
			))}
		</ArticleTabContainer>
	);
};
