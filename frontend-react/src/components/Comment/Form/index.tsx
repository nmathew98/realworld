import { Link } from "react-router-dom";

import { Button } from "../../Button";

export const CommentForm = ({ onPostComment, profileImage, profileLink }) => (
	<form className="card comment-form">
		<div className="card-block">
			<textarea
				className="form-control"
				placeholder="Write a comment..."
				rows={3}
			/>
		</div>
		<div className="card-footer">
			<Link to={profileLink} className="comment-author">
				<img src={profileImage} className="comment-author-img" />
			</Link>
			<Button onClick={onPostComment}>Post Comment</Button>
		</div>
	</form>
);
