import { AUTH_TOKEN_KEY } from "../utilities/constants";

const API_BASE = import.meta.env.API ?? "https://api.realworld.io/api";

// Docs: https://api.realworld.io/api-docs/#/
const createApi = () => {
  const _fetch =
    (
      url: string,
      method: string,
      unwrap?: (o: Record<string, any>) => Record<string, any>,
      params?: Record<string, any>
    ) =>
    async (body?: any) => {
      const token = window.localStorage.getItem(AUTH_TOKEN_KEY);

      const _params = { ...params };
      Object.keys(_params).forEach((key) => {
        if (!_params[key]) delete _params[key];
      });

      const searchParams = new URLSearchParams(_params);

      const response = await fetch(
        `${API_BASE}${url}?${searchParams.toString()}`,
        {
          method,
          body: JSON.stringify(body),
          headers: {
            Authorization: token ? `Token ${token}` : null,
            "Content-Type": body ? "application/json" : null,
          },
        }
      );

      const result = await response.json();

      return unwrap ? unwrap(result) : result;
    };

  const unwrapAuthResult = (result: Record<string, any>) =>
    result?.user ?? null;
  const unwrapProfileResult = (result: Record<string, any>) =>
    result?.profile ?? null;
  const unwrapArticlesResult = (result: Record<string, any>) =>
    result?.articles ?? result?.article ?? null;
  const unwrapCommentsResult = (result: Record<string, any>) =>
    result?.comment ?? null;
  const unwrapTagsResult = (result: Record<string, any>) =>
    result?.tags ?? null;

  return Object.freeze({
    Auth: {
      login: _fetch("/users/login", "POST", unwrapAuthResult),
      register: _fetch("/users", "POST", unwrapAuthResult),
      currentUser: _fetch("/user", "GET", unwrapAuthResult),
      updateUser: _fetch("/user", "PUT", unwrapAuthResult),
    },
    Profile: {
      getByUsername: (username: string) =>
        _fetch(`/profiles/${username}`, "GET", unwrapProfileResult),
      followUser: (username: string) =>
        _fetch(`/profiles/${username}/follow`, "POST", unwrapProfileResult),
      unfollowUser: (username: string) =>
        _fetch(`/profiles/${username}/follow`, "DELETE", unwrapProfileResult),
    },
    Articles: {
      getFeed: (limit?: number, offset?: number) =>
        _fetch("/articles/feed", "GET", null, {
          limit,
          offset,
        }),
      getGlobalArticles: (
        tag?: string,
        author?: string,
        favorited?: string,
        limit?: number,
        offset?: number
      ) =>
        _fetch("/articles", "GET", null, {
          tag,
          author,
          favorited,
          limit,
          offset,
        }),
      createArticle: _fetch("/articles", "POST", unwrapArticlesResult),
      getArticle: (slug: string) =>
        _fetch(`/articles/${slug}`, "GET", unwrapArticlesResult),
      updateArticle: (slug: string) =>
        _fetch(`/articles/${slug}`, "PUT", unwrapArticlesResult),
      deleteArticle: (slug: string) => _fetch(`/articles/${slug}`, "DELETE"),
    },
    Comments: {
      getComments: (slug: string) =>
        _fetch(`/articles/${slug}/comments`, "GET", unwrapCommentsResult),
      createComment: (slug: string) =>
        _fetch(`/articles/${slug}/comments`, "POST", unwrapCommentsResult),
      deleteComment: (slug: string, id: string) =>
        _fetch(
          `/articles/${slug}/comments/${id}`,
          "DELETE",
          unwrapCommentsResult
        ),
    },
    Favorites: {
      favoriteArticle: (slug: string) =>
        _fetch(`/articles/${slug}/favourite`, "POST", unwrapArticlesResult),
      unfavoriteArticle: (slug: string) =>
        _fetch(`/articles/${slug}/favorite`, "DELETE", unwrapArticlesResult),
    },
    Tags: {
      getTags: _fetch("/tags", "GET", unwrapTagsResult),
    },
  });
};

export const Resources = createApi();
