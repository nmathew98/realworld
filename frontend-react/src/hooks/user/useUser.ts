import { useQuery, useMutation, useQueryClient } from "react-query";

import { useAuthorization } from "../auth/useAuthorization";

export const useUser = ({ username }) => {
	const [form, dispatchFormUpdate] = useReducer(reducer, initialForm);
	const [formErrors, setFormErrors] = useState<[string, string][] | null>(null);

	const queryClient = useQueryClient();
	const { isAuthenticated } = useContext(AuthContext);

	const {
		onChangeEmail,
		onChangePassword,
		onChangeUsername,
		formErrors: authorizationFieldErrors,
		makeOnSubmitForm: makeOnSubmitAuthorizationFields,
	} = useAuthorization();

	const {
		createArticle: _createArticle,
		deleteArticle: _deleteArticle,
		updateArticle: _updateArticle,
		favoriteArticle: _favoriteArticle,
		unfavoriteArticle: _unfavoriteArticle,
		followUser: _followUser,
		unfollowUser: _unfollowUser,
		updateProfile: _updateCurrentUserProfile,
		refetchProfile: refetchCurrentUserProfile,
	} = useContext(UserContext);

	const {
		mutate: createArticle,
		isLoading: isLoadingCreateArticle,
		isError: isErrorCreateArticle,
		error: errorCreateArticle,
	} = useMutation(_createArticle);

	const onArticleMutated = (_, { slug }) => {
		queryClient.invalidateQueries([QUERY_KEYS.Article, slug]);
		queryClient.invalidateQueries([QUERY_KEYS.Articles, ARTICLES_TYPES.Global]);
	};
	const {
		mutate: deleteArticle,
		isLoading: isLoadingDeleteArticle,
		isError: isErrorDeleteArticle,
		error: errorDeleteArticle,
	} = useMutation(_deleteArticle, {
		onSuccess: onArticleMutated,
	});
	const {
		mutate: updateArticle,
		isLoading: isLoadingUpdateArticle,
		isError: isErrorUpdateArticle,
		error: errorUpdateArticle,
	} = useMutation(_updateArticle, {
		onSuccess: onArticleMutated,
	});
	const {
		mutate: favoriteArticle,
		isLoading: isLoadingFavoriteArticle,
		isError: isErrorFavoriteArticle,
		error: errorFavoriteArticle,
	} = useMutation(_favoriteArticle, {
		onSuccess: onArticleMutated,
	});
	const {
		mutate: unfavoriteArticle,
		isLoading: isLoadingUnfavoriteArticle,
		isError: isErrorUnfavoriteArticle,
		error: errorUnfavoriteArticle,
	} = useMutation(_unfavoriteArticle, {
		onSuccess: onArticleMutated,
	});

	const { mutate: followUser } = useMutation<any, any, any>(_followUser);
	const { mutate: unfollowUser } = useMutation<any, any, any>(_unfollowUser);

	const {
		mutate: updateUser,
		error: errorUpdateUser,
		isLoading: isLoadingUpdateUser,
		isError: isErrorUpdateUser,
	} = useMutation<any, any, any>(_updateCurrentUserProfile, {
		onSuccess: () => {
			queryClient.invalidateQueries(QUERY_KEYS.CurrentUser);
			refetchCurrentUserProfile();
		},
	});

	const queryFnGetProfile = () =>
		Resources.User.read.username({ username })({ body: null });
	const { data: profile, refetch: refetchUserProfile } = useQuery(
		[QUERY_KEYS.Profile, username],
		queryFnGetProfile,
		{
			enabled: !!isAuthenticated && !!username,
		},
	);

	const makeOnClickFollow = (username: string) => () => {
		if (profile.following) unfollowUser({ username });
		else followUser({ username });

		refetchUserProfile();
	};

	const validators = {
		// https://regexr.com/39nr7
		image:
			/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
		bio: /[\w\d]/,
	};

	const errors = {
		image: "Avatar URL must be a valid HTTP link",
		bio: "Bio can only contain words and numbers",
	};

	const onSubmitAuthorizationFields = makeOnSubmitAuthorizationFields(
		form => form,
		true,
	);

	const makeOnSubmitForm = (f, isOptional?: boolean) => event => {
		event.preventDefault();

		const authorizationFields = onSubmitAuthorizationFields(event);
		const profileFields = form;

		const merged = {
			...authorizationFields,
			...profileFields,
		};

		if (!isOptional && Object.values(merged).length === 0) {
			setFormErrors([["form", "Form is incomplete"]]);

			return form;
		}

		dispatchFormUpdate({ type: PROFILE_UPDATE_TYPES.Reset });

		return f(merged, event);
	};
	const onChangeBio = event =>
		dispatchFormUpdate({
			type: PROFILE_UPDATE_TYPES.UpdateBio,
			bio: event.target.value,
		});

	const onChangeAvatar = event =>
		dispatchFormUpdate({
			type: PROFILE_UPDATE_TYPES.UpdateImage,
			image: event.target.value,
		});

	useEffect(() => {
		const formErrors = Object.entries(form)
			.filter(([key, value]) => value && !validators[key].test(value))
			.map(([key]) => [key, errors[key]]) as [string, string][];

		setFormErrors(formErrors.concat(authorizationFieldErrors ?? []));
	}, [form, authorizationFieldErrors]);

	return {
		profile,
		formErrors,
		onChangeEmail,
		onChangeUsername,
		onChangePassword,
		onChangeBio,
		onChangeAvatar,
		makeOnSubmitForm,
		updateUser,
		makeOnClickFollow,
		createArticle,
		deleteArticle,
		updateArticle,
		favoriteArticle,
		unfavoriteArticle,
		isLoadingCreateArticle,
		isLoadingDeleteArticle,
		isLoadingUpdateArticle,
		isLoadingFavoriteArticle,
		isLoadingUnfavoriteArticle,
		isLoadingUpdateUser,
		isErrorCreateArticle,
		isErrorDeleteArticle,
		isErrorUpdateArticle,
		isErrorFavoriteArticle,
		isErrorUnfavoriteArticle,
		isErrorUpdateUser:
			isErrorUpdateUser || (formErrors && formErrors.length > 0),
		errorCreateArticle,
		errorDeleteArticle,
		errorUpdateArticle,
		errorFavoriteArticle,
		errorUnfavoriteArticle,
		errorUpdateUser,
	};
};

const PROFILE_UPDATE_TYPES = {
	UpdateImage: Symbol("UpdateImage"),
	UpdateBio: Symbol("UpdateBio"),
	Reset: Symbol("Reset"),
};

const reducer = (state, action) => {
	switch (action.type) {
		case PROFILE_UPDATE_TYPES.UpdateImage: {
			return { ...state, image: action.image };
		}
		case PROFILE_UPDATE_TYPES.UpdateBio: {
			return { ...state, bio: action.bio };
		}
		case PROFILE_UPDATE_TYPES.Reset: {
			return Object.create(null);
		}
		default: {
			return state;
		}
	}
};

const initialForm = Object.create(null);
