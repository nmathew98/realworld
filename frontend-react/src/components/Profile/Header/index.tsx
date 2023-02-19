import { ButtonAction } from "../../Button/Action";

const EMPTY_AVATAR = "https://api.realworld.io/images/smiley-cyrus.jpeg";

export const ProfileHeader = ({ username, bio, image, onPressFollow }) => (
	<>
		<img src={image ?? EMPTY_AVATAR} className="user-img" />
		<h4>{username}</h4>
		<p>{bio}</p>
		<ButtonAction icon="ion-plus-round" onClick={onPressFollow}>
			Follow {name}
		</ButtonAction>
	</>
);
