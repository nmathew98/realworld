import { ArticleCard } from "./Card";
import { ArticlePaginationContainer } from "./Pagination/Container";
import { ArticlePaginationItem } from "./Pagination/Item";
import { useArticles } from "../../hooks/article/useArticles";

export const Articles = () => {
	const {
		currentPage,
		currentPageArticles,
		totalNumberOfPages,
		makeOnClickPaginationItem,
		isLoadingArticles,
		isRefetchingArticles,
		isChangingPageArticles,
		isErrorArticles,
	} = useArticles();

	return (
		<>
			{!isLoadingArticles ? null : <span>Loading!!</span>}
			{!isErrorArticles ? null : <span>Big F</span>}

			{(isRefetchingArticles && !isChangingPageArticles) ||
			isErrorArticles ? null : (
				<>
					{currentPageArticles.map(article => (
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
				</>
			)}
		</>
	);
};
