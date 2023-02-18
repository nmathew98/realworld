import { format } from "date-fns";

import { ButtonAction } from "../../Button/Action";

export const ProfileArticle = ({
	onClickFavourite,
	profileLink,
	profileImage,
	author,
	createdAt,
	favouriteCount,
	articleLink,
	title,
	description,
	tags,
}) => (
	<div className="article-preview">
		<div className="article-meta">
			<a href={profileLink}>
				<img src={profileImage} />
			</a>
			<div className="info">
				<a href={profileLink} className="author">
					{author}
				</a>
				<span className="date">{formatDate(createdAt)}</span>
			</div>
			<ButtonAction onClick={onClickFavourite} icon="ion-heart">
				{favouriteCount}
			</ButtonAction>
		</div>
		<a href={articleLink} className="preview-link">
			<h1>{title}</h1>
			<p>{description}</p>
			<span>Read more...</span>
			{!!tags && (
				<ul className="tag-list">
					{tags?.map(tag => (
						<li key={tag} className="tag-default tag-pill tag-outline">
							{tag}
						</li>
					))}
				</ul>
			)}
		</a>
	</div>
);

const formatDate = (date: Date) => format(date, "LLLL wo");
