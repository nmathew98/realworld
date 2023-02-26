import { ArticleActionBar } from "../ActionBar";

export const ArticleHeader = ({
	onClickFavorite,
	onClickFollowAuthor,
	title,
	profileImage,
	profileLink,
	author,
	createdAt,
	favoritesCount,
	isAuthor,
}: ArticleHeaderProps) => (
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
				favoritesCount={favoritesCount}
				isAuthor={isAuthor}
			/>
		</div>
	</>
);

interface ArticleHeaderProps {
	onClickFavorite?: () => any;
	onClickFollowAuthor?: () => any;
	title: string;
	profileImage: string;
	profileLink: string;
	author: string;
	createdAt: Date;
	favoritesCount: number;
	isAuthor?: boolean;
}
