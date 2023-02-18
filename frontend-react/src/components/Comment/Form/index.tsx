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
			<a href={profileLink} className="comment-author">
				<img src={profileImage} className="comment-author-img" />
			</a>
			<Button onClick={onPostComment}>Post Comment</Button>
		</div>
	</form>
);
