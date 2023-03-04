import { createRouter } from "h3";

import { Articles } from "./articles";
import { use, verify } from "./middleware/passport";
import { Profiles } from "./profiles";
import { Tags } from "./tags";
import { Users } from "./users";

use(verify.bind(CONTEXT));

export const Router = createRouter()
	.add("/users", Users.handler)
	.add("/users/*", Users.handler)
	.add("/profiles", Profiles.handler)
	.add("/profiles/*", Profiles.handler)
	.add("/tags", Tags.handler)
	.add("/tags/*", Tags.handler)
	.add("/articles", Articles.handler)
	.add("/articles/*", Articles.handler);
