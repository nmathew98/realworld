import { User } from "../../../value-objects/user";

export const makeArticle = args => {
	const user = args.find(arg => arg instanceof User);

	return [];
};

// pipe(makeUser, makeArticle, pop)([{ uuid: e.body.uuid }]);
