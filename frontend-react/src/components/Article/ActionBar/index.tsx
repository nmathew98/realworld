import { format } from "date-fns";

import { ButtonAction } from "../../Button/Action";

export const ArticleActionBar = ({
	onClickFollowAuthor,
	onClickFavorite,
	profileLink,
	profileImage,
	author,
	createdAt,
	favoriteCount,
}) => (
	<>
		<a href={profileLink}>
			<img src={profileImage} />
		</a>
		<div className="info">
			<a href={profileLink} className="author">
				{author}
			</a>
			<span className="date">{formatDate(createdAt)}</span>
		</div>
		<ButtonAction icon="ion-plus-round" onClick={onClickFollowAuthor}>
			Follow {author}
		</ButtonAction>
		<ButtonAction icon="ion-heart" onClick={onClickFavorite}>
			Favorite Post <span className="counter">({favoriteCount})</span>
		</ButtonAction>
	</>
);

const formatDate = (date: Date) => format(date, "LLLL wo");