export class User {
	public uuid: string;
	public username?: string;
	public email?: string;
	public accessToken?: string;
	public refreshToken?: string;
	public image?: string;
	public bio?: string;

	constructor(data) {
		this.uuid = data.uuid;
		this.username = data.username;
		this.email = data.email;
		this.image = data.image;
		this.bio = data.bio;
		this.accessToken = data.tokens?.accessToken;
		this.refreshToken = data.tokens?.refreshToken;
	}
}
