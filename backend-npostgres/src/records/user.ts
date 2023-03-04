export class User {
	public uuid: string;
	public username?: string;
	public email?: string;
	public image?: string;
	public bio?: string;
	public tokens?: UserTokens;

	constructor(data) {
		this.uuid = data.uuid;
		this.username = data.username;
		this.email = data.email;
		this.image = data.image;
		this.bio = data.bio;
		this.tokens = data.tokens;
	}
}

export const toUserResponse = (user: InstanceType<typeof User>) => ({
	user: {
		email: user.email,
		token: user.tokens?.accessToken,
		username: user.username,
		bio: user.bio || null,
		image: user.image || null,
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
