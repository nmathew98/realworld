import { format } from "date-fns";
import { Link } from "react-router-dom";

import { ButtonAction } from "../../Button/Action";

export const ArticleActionBar = ({
	onClickFollowAuthor,
	onClickFavorite,
	profileLink,
	profileImage,
	author,
	createdAt,
	favoriteCount,
}: ArticleActionBarProps) => (
	<>
		<Link to={profileLink}>
			<img src={profileImage} />
		</Link>
		<div className="info">
			<Link to={profileLink} className="author">
				{author}
			</Link>
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

interface ArticleActionBarProps {
	onClickFollowAuthor: () => any;
	onClickFavorite: () => any;
	profileLink: string;
	profileImage: string;
	author: string;
	createdAt: Date;
	favoriteCount: number;
}

const formatDate = (date: Date) => format(date, "LLLL wo");
