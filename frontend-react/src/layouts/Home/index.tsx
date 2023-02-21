import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

import { useNavigation } from "../../hooks/auth/useNavigation";
import { useTags } from "../../hooks/article/useTags";
import { LayoutBase } from "../";
import { ArticleTabContainer } from "../../components/Article/Tab/Container";
import { ArticlePaginationContainer } from "../../components/Article/Pagination/Container";
import { ArticleTabItem } from "../../components/Article/Tab/Item";
import { TagContainer } from "../../components/Tag/Container";
import { TagPill } from "../../components/Tag/Pill";
import { SidebarContainer } from "../../components/Sidebar/Container";

export const LayoutHome = ({ Pagination, children }) => {
	const [searchParams] = useSearchParams();
	const { tags, isLoadingTags } = useTags();
	const { articleTabs } = useNavigation();

	const tag = searchParams.has("tag") ? searchParams.get("tag") : null;

	return (
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
							<ArticleTabContainer>
								{articleTabs.map(item => (
									<ArticleTabItem
										as={Link}
										to="/"
										key={item.title}
										isActive={typeof tag === "string" ? false : true}>
										{item.title}
									</ArticleTabItem>
								))}
								{!tag ? null : (
									<ArticleTabItem
										as={Link}
										to={`/?tag=${tag}`}
										key={tag}
										isActive>
										#{tag}
									</ArticleTabItem>
								)}
							</ArticleTabContainer>
							{children}
							{!Pagination ? null : (
								<ArticlePaginationContainer>
									{Pagination}
								</ArticlePaginationContainer>
							)}
						</div>
						{isLoadingTags ? null : (
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
						)}
					</div>
				</div>
			</div>
		</LayoutBase>
	);
};
