import { createRouter } from "h3";

import login from "./login";
import profile from "./profile";
import registration from "./registration";
import update from "./update";

export const Users = createRouter()
	.post("/users", registration)
	.post("/users/login", login)
	.get("/users", profile)
	.put("/users", update);
