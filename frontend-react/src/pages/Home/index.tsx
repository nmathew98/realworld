import { Title } from "react-head";
import { useSearchParams } from "react-router-dom";

import { LayoutHome } from "../../layouts/Home";
import { ArticleCard } from "../../components/Article/Card";
import { ArticlePaginationItem } from "../../components/Article/Pagination/Item";
import { useArticles } from "../../hooks/article/useArticles";

export const Home = () => {
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
		<LayoutHome
			Pagination={
				isRefetchingArticles && !isChangingPageArticles ? null : (
					<Pagination
						totalNumberOfPages={totalNumberOfPages}
						makeOnClickPaginationItem={makeOnClickPaginationItem}
						currentPage={currentPage}
					/>
				)
			}>
			<Title>Home - {BRAND_NAME}</Title>

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
		</LayoutHome>
	);
};

const Pagination = ({
	totalNumberOfPages,
	makeOnClickPaginationItem,
	currentPage,
}) => (
	<>
		{new Array(Math.ceil(totalNumberOfPages)).fill(null).map((_, i) => {
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
	</>
);
