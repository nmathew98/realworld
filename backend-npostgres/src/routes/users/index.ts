import { createRouter, eventHandler } from "h3";

import { login } from "./login";
import { profile } from "./profile";
import { registration } from "./registration";
import { update } from "./update";

export const Users = createRouter()
	.post("/users", eventHandler(registration.bind(CONTEXT)))
	.post("/users/login", eventHandler(login.bind(CONTEXT)))
	.get("/users", eventHandler(profile.bind(CONTEXT)))
	.put("/users", eventHandler(update.bind(CONTEXT)));
