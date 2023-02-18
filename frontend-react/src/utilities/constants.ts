export const STORAGE_KEYS = {
	Token: "conduit-auth-token",
	User: "conduit-user",
};

export const QUERY_KEYS = {
	CurrentUser: "current-user",
};

export const AUTHENTICATION_STATUS = {
	Unauthenticated: Symbol("Unauthenticated"),
	Authenticated: Symbol("Authenticated"),
};
