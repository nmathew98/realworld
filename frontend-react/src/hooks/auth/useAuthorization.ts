import { useMutation } from "react-query";

export const useAuthorization = () => {
	const [form, dispatchFormUpdate] = useReducer(reducer, initialForm);
	const [formErrors, setFormErrors] = useState<[string, string][]>([]);
	const { onAuthenticationSuccess, onAuthenticationError } =
		useContext(AuthContext);

	const onChangeUsername = username =>
		dispatchFormUpdate({
			type: AUTHORIZATION_REDUCER_TYPES.UpdateUsername,
			username,
		});
	const onChangePassword = password =>
		dispatchFormUpdate({
			type: AUTHORIZATION_REDUCER_TYPES.UpdatePassword,
			password,
		});
	const onChangeEmail = email =>
		dispatchFormUpdate({
			type: AUTHORIZATION_REDUCER_TYPES.UpdateEmail,
			email,
		});
	const makeOnSubmitForm = f => f(form);

	const validators = {
		username: /[a-zA-Z0-9]{5,10}/,
		email: EMAIL_REGEX,
		password: /[a-zA-Z0-9]{8,12}/,
	};

	const errors = {
		username:
			"Username must be between 5 - 10 characters and only contain letters and numbers",
		email: "Invalid email address",
		password:
			"Password must be between 8 - 12 characters and only contain letters and numbers",
	};

	const {
		mutate: register,
		isLoading: isLoadingRegister,
		isError: isErrorRegister,
		error: errorRegister,
	} = useMutation(Resources.User.create, {
		onSuccess: onAuthenticationSuccess,
		onError: onAuthenticationError,
	});

	const {
		mutate: authenticate,
		isLoading: isLoadingLogin,
		isError: isErrorLogin,
		error: errorLogin,
	} = useMutation(Resources.User.read.login, {
		onSuccess: onAuthenticationSuccess,
		onError: onAuthenticationError,
	});

	useEffect(() => {
		const formErrors = Object.entries(form)
			.filter(([key, value]) => !validators[key].test(value))
			.map(([key]) => [key, errors[key]]) as [string, string][];

		setFormErrors(formErrors);
	}, [form]);

	return {
		register,
		authenticate,
		isLoadingRegister,
		isLoadingLogin,
		isErrorRegister,
		isErrorLogin,
		errorRegister,
		errorLogin,
		formErrors,
		onChangeEmail,
		onChangePassword,
		onChangeUsername,
		makeOnSubmitForm,
	};
};

const makeAuthorizationMatch = buildMakeMatch(
	AUTHORIZATION_REDUCER_TYPES.UpdateUsername,
	AUTHORIZATION_REDUCER_TYPES.UpdateEmail,
	AUTHORIZATION_REDUCER_TYPES.UpdatePassword,
);
const reducer = (state, action) => {
	const match = makeAuthorizationMatch(action.type, state);

	return match(
		{ ...state, username: action.username.toLowerCase() },
		{ ...state, email: action.email.toLowerCase() },
		{ ...state, password: action.password },
	);
};

const initialForm = Object.create(null);
