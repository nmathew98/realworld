import { ArticleActionBar } from "../ActionBar";

export const ArticleHeader = ({
	onClickFavorite,
	onClickFollowAuthor,
	title,
	profileImage,
	profileLink,
	author,
	createdAt,
	favoriteCount,
}) => (
	<>
		<h1>{title}</h1>
		<div className="article-meta">
			<ArticleActionBar
				onClickFollowAuthor={onClickFollowAuthor}
				onClickFavorite={onClickFavorite}
				profileLink={profileLink}
				profileImage={profileImage}
				author={author}
				createdAt={createdAt}
				favoriteCount={favoriteCount}
			/>
		</div>
	</>
);
