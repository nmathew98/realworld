import { promisify } from "node:util";
import jwt from "jsonwebtoken";

if (!process.env.JWT_ACCESS_EXPIRES)
	throw new Error("Environment variable `JWT_ACCESS_EXPIRES` is not defined");
if (!process.env.JWT_REFRESH_EXPIRES)
	throw new Error("Environment variable `JWT_REFRESH_EXPIRES` is not defined");
if (!process.env.JWT_ACCESS_SECRET)
	throw new Error("Environment variable `JWT_ACCESS_SECRET` is not defined");
if (!process.env.JWT_REFRESH_SECRET)
	throw new Error("Environment variable `JWT_REFRESH_SECRET` is not defined");

export const Jwt = {
	verify: promisify(jwt.verify),
	sign: promisify(jwt.sign),
};
