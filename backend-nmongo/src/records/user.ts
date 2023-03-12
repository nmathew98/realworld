import type { Document, WithId } from "mongodb";

export type User = ReturnType<typeof toUserDocument>;
export const toUserDocument = (doc: WithId<Document>) => ({
	_id: doc._id?.toString() || null,
	username: doc.username || null,
	email: doc.email || null,
	password: doc.password || null,
	bio: doc.password || null,
	image: doc.image || null,
	follows: doc.follows?.map(follows => follows._id ?? follows) || null,
	favorites: doc.favorites?.map(article => article._id ?? article) || null,
});

export const toUserResponse = (user: User, tokens?: UserTokens) => ({
	user: {
		email: user.email,
		token: tokens?.accessToken?.value,
		username: user.username,
		bio: user.bio,
		image: user.image,
	},
});

export const toProfileResponse = (user: User, currentUser: User) => ({
	profile: {
		username: user.username,
		bio: user.bio,
		image: user.image,
		following: currentUser.follows.some(
			followedUser => followedUser._id === user._id,
		),
	},
});

export interface UserTokens {
	accessToken: {
		value: string;
		expiresIn: number;
	};
	refreshToken: {
		value: string;
		expiresIn: number;
	};
}
