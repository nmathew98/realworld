import { useNavigation } from "../../hooks/auth/useNavigation";
import { useTags } from "../../hooks/article/useTags";
import { NavigationContainer } from "../../components/Navigation/Container";
import { NavigationItem } from "../../components/Navigation/Item";
import { ArticleTabContainer } from "../../components/Article/Tab/Container";
import { ArticleTabItem } from "../../components/Article/Tab/Item";
import { TagContainer } from "../../components/Tag/Container";
import { TagPill } from "../../components/Tag/Pill";

export const HomeLayout = ({ Pagination, children }) => {
	const { tags, isLoadingTags } = useTags();
	const { articleTabs, allowedRoutes, isRouteActive } = useNavigation();

	return (
		<>
			<NavigationContainer brandName={BRAND_NAME}>
				{allowedRoutes.map(item => (
					// @ts-expect-error: type stuff
					<NavigationItem
						key={item.title}
						{...item}
						isActive={isRouteActive(item)}>
						{item.title}
					</NavigationItem>
				))}
			</NavigationContainer>
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
							{!!Pagination && <Pagination />}
						</div>
						{!isLoadingTags && (
							<div className="col-md-3">
								<p>Popular Tags</p>
								<TagContainer>
									{tags.map(tag => (
										<TagPill key={tag}>{tag}</TagPill>
									))}
								</TagContainer>
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
};
