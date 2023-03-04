import { createRouter, eventHandler } from "h3";

import { login } from "./login";
import { registration } from "./registration";

export const Users = createRouter()
	.post("/users", eventHandler(registration))
	.get(
		"/users",
		eventHandler(() => "Hi"),
	)
	.put(
		"/users",
		eventHandler(() => "Hello"),
	)
	.post("/users/login", eventHandler(login));
