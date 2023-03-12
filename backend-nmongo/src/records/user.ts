export type User = ReturnType<typeof toUserDocument>;
export const toUserDocument = (doc: Record<string, any>) => ({
	_id: doc._id || null,
	username: doc.username || null,
	email: doc.email || null,
	password: doc.password || null,
	bio: doc.password || null,
	image: doc.image || null,
	follows: doc.follows?.map(doc => doc._id ?? doc) || null,
	favorites: doc.favorites?.map(doc => doc._id ?? doc) || null,
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
