import { format } from "date-fns";

import { ButtonAction } from "../../Button/Action";

export const ArticleHeader = ({
	onPressFavourite,
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
			<a href={profileLink}>
				<img src={profileImage} />
			</a>
			<div className="info">
				<a href={profileLink} className="author">
					{author}
				</a>
				<span className="date">{formatDate(createdAt)}</span>
			</div>
			<ButtonAction icon="ion-plus-round" onClick={onPressFollowAuthor}>
				Follow {author}
			</ButtonAction>
			<ButtonAction icon="ion-heart" onClick={onPressFavourite}>
				Favorite Post <span className="counter">({favoriteCount})</span>
			</ButtonAction>
		</div>
	</>
);

const formatDate = (date: Date) => format(date, "LLLL wo");
