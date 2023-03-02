import { createRouter } from "h3";

import { Articles } from "./articles";
import { Profiles } from "./profiles";
import { Tags } from "./tags";
import { Users } from "./users";

export const Router = createRouter()
	.use("/users", Users.handler)
	.use("/profiles", Profiles.handler)
	.use("/tags", Tags.handler)
	.use("/articles", Articles.handler);
