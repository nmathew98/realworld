import type {
	VerifyFunctionWithRequest,
	IStrategyOptionsWithRequest,
} from "passport-local";
import type { H3Event } from "h3";
import { readBody } from "h3";
import { getCookie, setCookie } from "h3";
import { Strategy as LocalStrategy } from "passport-local";
import _passport from "passport";

import { makeUser } from "../../entities/user/create";

export const usePassport = e =>
	authenticate(e) as Promise<InstanceType<typeof User>>;

export async function verify(
	this: Context,
	req: any,
	email: string,
	password: string,
	done: any,
) {
	try {
		const body = req.body;

		const user = await makeUser.bind(this)({
			username: body.username,
			email: body.email,
			password: body.password,
			generateTokens: true,
		});

		done(null, user);
	} catch (error: any) {
		done(error);
	}
}

export const use = (verify: VerifyFunctionWithRequest) => {
	const strategyOptions: IStrategyOptionsWithRequest = {
		usernameField: "email",
		passwordField: "password",
		passReqToCallback: true,
	};

	const strategy = new LocalStrategy(strategyOptions, verify);

	return _passport.use(strategy);
};

const authenticate = (event: H3Event) =>
	new Promise((resolve, reject) =>
		readBody(event).then(body =>
			_passport.authenticate(
				"local",
				(error?: Error, user?: InstanceType<typeof User>) => {
					if (error) return reject(error);

					const existingAccessToken = getCookie(event, "authorization");
					const existingRefreshToken = getCookie(event, "refresh");

					if (!existingAccessToken)
						setCookie(
							event,
							"authorization",
							user?.tokens?.accessToken.value as string,
							{
								secure: process.env.NODE_ENV === "production",
								maxAge: user?.tokens?.accessToken.expiresIn,
							},
						);

					if (!existingRefreshToken)
						setCookie(
							event,
							"refresh",
							user?.tokens?.refreshToken.value as string,
							{
								secure: process.env.NODE_ENV === "production",
								maxAge: user?.tokens?.refreshToken.expiresIn,
							},
						);

					return resolve(user);
				},
			)({ ...event.node.req, body: body.user }, event.node.res),
		),
	);
