import { Link } from "react-router-dom";
import { format } from "date-fns";

import { Icon } from "../../Icon";

export const CommentCard = ({
	text,
	profileLink,
	profileImage,
	author,
	createdAt,
	onClickEdit,
	onClickDelete,
}) => (
	<div className="card">
		<div className="card-block">
			<p className="card-text">{text}</p>
		</div>
		<div className="card-footer">
			<Link to={profileLink} className="comment-author">
				<img src={profileImage} className="comment-author-img" />
			</Link>
			&nbsp;
			<Link to={profileLink} className="comment-author">
				{author}
			</Link>
			<span className="date-posted">{formatDate(createdAt)}</span>
			{!(onClickEdit || onClickDelete) ? null : (
				<span className="mod-options">
					{onClickEdit && <Icon name="ion-edit" />}
					{onClickDelete && <Icon name="ion-trash-a" />}
				</span>
			)}
		</div>
	</div>
);

const formatDate = (date: Date) => format(date, "PPP");
