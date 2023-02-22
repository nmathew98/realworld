import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

import { useNavigation } from "../../hooks/auth/useNavigation";
import { useTags } from "../../hooks/article/useTags";
import { LayoutBase } from "../";
import { ArticleTabContainer } from "../../components/Article/Tab/Container";
import { ArticleTabItem } from "../../components/Article/Tab/Item";
import { TagContainer } from "../../components/Tag/Container";
import { TagPill } from "../../components/Tag/Pill";
import { SidebarContainer } from "../../components/Sidebar/Container";

export const LayoutHome = ({ children }) => (
	<LayoutBase>
		<div className="home-page">
			<div className="banner">
				<div className="container">
					<h1 className="logo-font">{BRAND_NAME}</h1>
					<p>A place to share your knowledge.</p>
				</div>
			</div>
			<div className="container page">
				<div className="row">
					<div className="col-md-9">
						<ArticleTabs />
						{children}
					</div>
					<Sidebar />
				</div>
			</div>
		</div>
	</LayoutBase>
);

const ArticleTabs = () => (
	<ArticleTabContainer>
		<ArticleTagTabItems />
	</ArticleTabContainer>
);

const ArticleTagTabItems = () => {
	const [searchParams] = useSearchParams();
	const tag = searchParams.has("tag") ? searchParams.get("tag") : null;
	const { articleTabs } = useNavigation();

	if (!tag) return null;

	return (
		<>
			{articleTabs?.map(item => (
				<ArticleTabItem
					key={item.href}
					as={Link}
					to={item.href}
					isActive={typeof tag === "string" ? false : true}>
					{item.title}
				</ArticleTabItem>
			))}
			<ArticleTabItem as={Link} to={`/?tag=${tag}`} key={tag} isActive>
				#{tag}
			</ArticleTabItem>
		</>
	);
};

const Sidebar = () => {
	const { tags, isLoadingTags } = useTags();

	if (isLoadingTags) return null;

	return (
		<div className="col-md-3">
			<SidebarContainer title="Popular Tags">
				<TagContainer as="div">
					{tags?.map(tag => (
						<TagPill as={Link} to={`/?tag=${tag}`} key={tag}>
							{tag}
						</TagPill>
					))}
				</TagContainer>
			</SidebarContainer>
		</div>
	);
};
