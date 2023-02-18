import { STORAGE_KEYS } from "../utilities/constants";

const API_BASE = import.meta.env.API ?? "https://api.realworld.io/api";

const _fetch =
	(
		url: string,
		method: string,
		unwrap?: ((o: Record<string, any>) => Record<string, any>) | null,
		params?: Record<string, any> | null,
	) =>
	async ({ body }) => {
		const token = !import.meta.env.API
			? window.localStorage.getItem(STORAGE_KEYS.Token)
			: null;

		const searchParams = new URLSearchParams(
			params ?? Object.create(null),
		).toString();

		const headers = new Headers();
		if (token) headers.append("Authorization", `Token ${token}`);
		if (body) headers.append("Content-Type", "application/json");

		const resource =
			`${API_BASE}${url}` + searchParams ? `?${searchParams}` : "";

		const response = await fetch(resource, {
			method,
			body: JSON.stringify(body),
			headers,
		});

		return response.json();
	};

const unwrapAuthResult = (result: Record<string, any>) => result?.user ?? null;
const unwrapProfileResult = (result: Record<string, any>) =>
	result?.profile ?? null;
const unwrapArticlesResult = (result: Record<string, any>) =>
	result?.articles ?? result?.article ?? null;
const unwrapCommentsResult = (result: Record<string, any>) =>
	result?.comment ?? null;
const unwrapTagsResult = (result: Record<string, any>) => result?.tags ?? null;

// Docs: https://api.realworld.io/api-docs/#/
export const Resources = Object.freeze({
	User: {
		create: _fetch("/users", "POST", unwrapAuthResult),
		read: {
			login: _fetch("/users/login", "POST", unwrapAuthResult),
			username: ({ username }) =>
				_fetch(`/profiles/${username}`, "GET", unwrapProfileResult),
			current: _fetch("/user", "GET", unwrapAuthResult),
		},
		update: {
			profile: _fetch("/user", "PUT", unwrapAuthResult),
			follow: ({ username }) =>
				_fetch(`/profiles/${username}/follow`, "POST", unwrapProfileResult),
			unfollow: ({ username }) =>
				_fetch(`/profiles/${username}/follow`, "DELETE", unwrapProfileResult),
		},
	},
	Feed: {
		read: {
			articles: ({ limit, offset }) =>
				_fetch("/articles/feed", "GET", null, {
					limit,
					offset,
				}),
			article: ({ tag, author, favorited, limit, offset }) =>
				_fetch("/articles", "GET", null, {
					tag,
					author,
					favorited,
					limit,
					offset,
				}),
		},
	},
	Articles: {
		create: _fetch("/articles", "POST", unwrapArticlesResult),
		read: ({ slug }) =>
			_fetch(`/articles/${slug}`, "GET", unwrapArticlesResult),
		update: {
			article: ({ slug }) =>
				_fetch(`/articles/${slug}`, "PUT", unwrapArticlesResult),
			favourite: ({ slug }) =>
				_fetch(`/articles/${slug}/favourite`, "POST", unwrapArticlesResult),
		},
		delete: {
			article: ({ slug }) => _fetch(`/articles/${slug}`, "DELETE"),
			favourite: ({ slug }) =>
				_fetch(`/articles/${slug}/favorite`, "DELETE", unwrapArticlesResult),
		},
	},
	Comments: {
		create: ({ slug }) =>
			_fetch(`/articles/${slug}/comments`, "POST", unwrapCommentsResult),
		read: ({ slug }) =>
			_fetch(`/articles/${slug}/comments`, "GET", unwrapCommentsResult),
		delete: ({ slug, id }) =>
			_fetch(
				`/articles/${slug}/comments/${id}`,
				"DELETE",
				unwrapCommentsResult,
			),
	},
	Tags: {
		read: _fetch("/tags", "GET", unwrapTagsResult),
	},
});
