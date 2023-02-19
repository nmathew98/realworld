import { ArticleActionBar } from "../ActionBar";

export const ArticleHeader = ({
	onPressFavorite,
	onPressFollowAuthor,
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
				onPressFollowAuthor={onPressFollowAuthor}
				onPressFavorite={onPressFavorite}
				profileLink={profileLink}
				profileImage={profileImage}
				author={author}
				createdAt={createdAt}
				favoriteCount={favoriteCount}
			/>
		</div>
	</>
);
