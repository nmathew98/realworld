import { Title } from "react-head";
import { useSearchParams } from "react-router-dom";

import { LayoutHome } from "../../layouts/Home";
import { ArticleCard } from "../../components/Article/Card";
import { ArticlePaginationContainer } from "../../components/Article/Pagination/Container";
import { ArticlePaginationItem } from "../../components/Article/Pagination/Item";
import { useArticles } from "../../hooks/article/useArticles";

// Everytime a filter (which is reflected in the URL changes), `Body` rerenders
export const Home = () => (
	<LayoutHome>
		<Title>Home - {BRAND_NAME}</Title>
		<Body />
	</LayoutHome>
);

const Body = () => {
	const [searchParams] = useSearchParams();
	const filters = Object.fromEntries(searchParams);

	const {
		currentPage,
		currentPageArticles,
		totalNumberOfPages,
		makeOnClickPaginationItem,
		isLoadingArticles,
		isRefetchingArticles,
		isChangingPageArticles,
		isErrorArticles,
	} = useArticles({ filters });

	return (
		<>
			{!isLoadingArticles ? null : <span>Loading!!</span>}
			{!isErrorArticles ? null : <span>Big F</span>}

			{isLoadingArticles || isErrorArticles
				? null
				: currentPageArticles.map(article => (
						<ArticleCard
							key={article.slug}
							profileLink={`/profile/${article.author.username}`}
							profileImage={article.author.image}
							author={article.author.username}
							createdAt={article.createdAt}
							favorited={article.favorited}
							favoritesCount={article.favoritesCount}
							articleLink={`/article/${article.slug}`}
							title={article.title}
							description={article.description}
							tags={article.tagList}
						/>
				  ))}
			{isRefetchingArticles && !isChangingPageArticles ? null : (
				<ArticlePaginationContainer>
					{new Array(totalNumberOfPages).fill(null).map((_, i) => {
						const onClickPaginationItem = makeOnClickPaginationItem(i + 1);

						const isActive = currentPage === i + 1;

						return (
							<ArticlePaginationItem
								key={i}
								onClick={onClickPaginationItem}
								isActive={isActive}>
								{i + 1}
							</ArticlePaginationItem>
						);
					})}
				</ArticlePaginationContainer>
			)}
		</>
	);
};
