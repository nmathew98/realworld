import { useNavigation } from "../../hooks/auth/useNavigation";
import { useTags } from "../../hooks/article/useTags";
import { LayoutBase } from "../";
import { ArticleTabContainer } from "../../components/Article/Tab/Container";
import { ArticleTabItem } from "../../components/Article/Tab/Item";
import { TagContainer } from "../../components/Tag/Container";
import { TagPill } from "../../components/Tag/Pill";
import { SidebarContainer } from "../../components/Sidebar/Container";

export const LayoutHome = ({ Pagination, children }) => {
	const { tags, isLoadingTags } = useTags();
	const { articleTabs } = useNavigation();

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
									// @ts-expect-error: type stuff
									<ArticleTabItem key={item.title}>{item.title}</ArticleTabItem>
								))}
							</ArticleTabContainer>
							{children}
							{!Pagination ? null : <Pagination />}
						</div>
						{isLoadingTags ? null : (
							<div className="col-md-3">
								<SidebarContainer title="Popular Tags">
									<TagContainer>
										{tags.map(tag => (
											<TagPill key={tag}>{tag}</TagPill>
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
