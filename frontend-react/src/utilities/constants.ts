export const STORAGE_KEYS = {
	Token: "conduit-auth-token",
	User: "conduit-user",
};

export const QUERY_KEYS = {
	CurrentUser: "current-user",
	Articles: "articles",
	Article: "article",
	Comments: "comments",
};

export const AUTHENTICATION_STATUS = {
	Unauthenticated: Symbol("Unauthenticated"),
	Authenticated: Symbol("Authenticated"),
};

export const AUTHORIZATION_REDUCER_TYPES = {
	UpdateUsername: Symbol("UpdateUsername"),
	UpdateEmail: Symbol("UpdateEmail"),
	UpdatePassword: Symbol("UpdatePassword"),
};

// https://emailregex.com
export const EMAIL_REGEX =
	/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
