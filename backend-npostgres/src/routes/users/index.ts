import { createRouter, eventHandler } from "h3";

export const Users = createRouter().get(
	"/users",
	eventHandler(() => "Hi from users"),
);
